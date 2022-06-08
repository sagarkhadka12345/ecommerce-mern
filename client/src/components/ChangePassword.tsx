import React from 'react'
import { userEndPoint } from '../Apis'
const username = 'ernme'
const changePasswordEndPoint = `${userEndPoint}/changePassword/${username}`

const ChangePassword = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'><form action={changePasswordEndPoint} method="POST">
      <input className='border p-2' type="password" name="password"/><br/>
      <input className='border p-2'  type="submit" value="submit"/>
      </form></div>
  )
}

export default ChangePassword