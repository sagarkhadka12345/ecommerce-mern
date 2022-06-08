import React, { useState } from 'react'
import { User } from '../types/types'
import { userEndPoint } from "../Apis/index"
import { cartEndPoint } from '../Apis'
const registationEndPoint = `${userEndPoint}/createUser`
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
  return (
    <div>
      <form action={registationEndPoint } method="POST" className=' registration-form p-2 border justify-between  items-center w-full pl-10'>
        <label htmlFor="firstname" >Firstname</label>
        <input className='border' type="text" name='firstname' required />
        <br /><label htmlFor="lastname">lastname</label>
        <input className='border' type="text" name='lastname' required />
        <br /><label htmlFor="username">username</label>
        <input className='border' type="text" name='username' required={check ? false : true} /><input className='username-checkbox' onChange={handleClickChange} type="checkbox"></input>
        <br /><label htmlFor="password">Password</label>
        <input className='border' type={passwordcheck ? "text" : "password"} name='password' required /><input className='password-checkbox' onChange={handlePasswordChange} type="checkbox"></input>
        <br /><label htmlFor="password">Confirm Password</label>
        <input className='border' type={confirmPasswordcheck ? "text" : "password"} name='confirmPassword' required /><input className='password-checkbox' onChange={handleConfirmPasswordChange} type="checkbox"></input>

        <br /><label htmlFor="email">Email</label>
        <input className='border' type="email" name='email' required />
        <br /><label htmlFor="address">address</label>
        <input className='border' type="text" name='address' required />
        <br />
        <input className='border hover:cursor-pointer'  type="submit" value="submit" />
      </form>
    </div>
  )
}

export default RegistrationForm