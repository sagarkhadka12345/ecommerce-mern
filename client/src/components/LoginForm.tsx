import React from 'react'
import { userEndPoint } from '../Apis'
const loginEnpoint = `${userEndPoint}/login`

const LoginForm = () => {
  return (
    <div><form action={loginEnpoint} method="POST" className='border m-10 flex-col justify-between h-[100px] '>
        <input type="text" name="username" className='border'/><br/>
        <input type="password" name="password"  className='border'/><br/>
        <button  type='submit'>Login</button></form></div>
  )
}

export default LoginForm