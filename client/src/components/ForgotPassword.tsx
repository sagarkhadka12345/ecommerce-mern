import React from 'react'
import { userEndPoint } from '../Apis'
const forgotPassword = `${userEndPoint}/forgotPassword`

const ForgotPassword = () => {
    return (
        <div className='flex w-[100vw] h-[100vh] justify-center items-center '>
            <form className='flex flex-col border p-6 items-center' action={forgotPassword} method="POST">
            <div className='font-bold text-indigo-400 md-2'>Forgot Password</div>
            <input className='border rounded-sm py-2 px-4 mt-2' type="text" placeholder="Please enter the username" name='username'/>
            <button className='w-max p-2 mt-4 mx-2 border-blue bg-indigo-400 hover:bg-indigo-500 hover:text-white' type='submit'>Reset Password</button>
            </form>
        </div>
    )
}

export default ForgotPassword