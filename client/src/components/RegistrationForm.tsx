import React, { useState } from 'react'
import { User } from '../types/types'
import { userEndPoint } from "../Apis/index"
import { cartEndPoint } from '../Apis'
import axios from 'axios'
const registrationEndPoint = `${userEndPoint}/createUser`
const createcartEndPoint = `${cartEndPoint}/createCart`



const RegistrationForm: React.FC = (): JSX.Element => {
  const [cart, setcart] = useState<any[]>([])
  const [check, setChecked] = useState(false);
  const [passwordcheck, setPasswordCheck] = useState(false);
  const [confirmPasswordcheck, setConfirmPasswordCheck] = useState(false);
  const handleClickChange = (event: any) => {
    event.target.checked ? setChecked(true) : setChecked(false);
  }
  const handlePasswordChange = (e: any) => {
    e.target.checked ? setPasswordCheck(true) : setPasswordCheck(false);
  }
  const handleConfirmPasswordChange = (e: any) => {
    e.target.checked ? setConfirmPasswordCheck(true) : setConfirmPasswordCheck(false);
  }


  const [firstname, setFirstname]= useState<string>("")
  const [lastname, setlastname]= useState<string>("")
  const [username, setusername]= useState<string>("")
  const [password, setPassword]= useState<string>("")
  const [confirmPassword, setconfirmPassword]= useState<string>("")
  const [email, setEmail]= useState<string>("")
  const [address, setAddress]= useState<string>("")

  const handleRegister =(e:any)=>{
    e.preventDefault()
    axios.post(createcartEndPoint,{
      username
         })
   axios.post(registrationEndPoint,{
    firstname, username, lastname, email, password, address, confirmPassword
   }).then(res=>{localStorage.setItem("token", res.data); window.location.href="/"})
   

  }
  return (
    <div>
      <form onSubmit={handleRegister} method="POST" className=' registration-form p-2 border justify-between  items-center w-full pl-10'>
        <label htmlFor="firstname" >Firstname</label>
        <input className='border' onChange={(e)=>setFirstname(e.target.value)} type="text" name='firstname' required />
        <br /><label htmlFor="lastname">lastname</label>
        <input className='border' onChange={(e)=>setlastname(e.target.value)}type="text" name='lastname' required />
        <br /><label htmlFor="username">username</label>
        <input className='border' onChange={(e)=>setusername(e.target.value)} type="text" name='username' required={check ? false : true} /><input className='username-checkbox' onChange={handleClickChange} type="checkbox"></input>
        <br /><label htmlFor="password">Password</label>
        <input className='border' onChange={(e)=>setPassword(e.target.value)} type={passwordcheck ? "text" : "password"} name='password' required /><input className='password-checkbox' onChange={handlePasswordChange} type="checkbox"></input>
        <br /><label htmlFor="password">Confirm Password</label>
        <input className='border' onChange={(e)=>setconfirmPassword(e.target.value)} type={confirmPasswordcheck ? "text" : "password"} name='confirmPassword' required /><input className='password-checkbox' onChange={handleConfirmPasswordChange} type="checkbox"></input>

        <br /><label htmlFor="email">Email</label>
        <input className='border'onChange={(e)=>setEmail(e.target.value)} type="email" name='email' required />
        <br /><label htmlFor="address">address</label>
        <input className='border'onChange={(e)=>setAddress(e.target.value)} type="text" name='address' required />
        <br />
        <input className='border hover:cursor-pointer'  type="submit" value="submit" />
      </form>
    </div>
  )
}

export default RegistrationForm