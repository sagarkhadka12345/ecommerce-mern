import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { userEndPoint } from '../Apis'

import { Link } from 'react-router-dom'
import { User } from '../types/types'








const NavBar: React.FC = (): JSX.Element => {
    const api = `${userEndPoint}/findUser`
    const [user, setUser] = useState<User>()
    useEffect(() => {
        axios.get(`${api}`,{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("token")
            }
        }).then((res) => { setUser(res.data);
         })
    }, [api])
   const logout = ()=>{
    localStorage.removeItem("token");
    window.location.href= "/";
   }


    return (
        <><nav className='flex py-7 px-8  text-indigo-900 bg-gray-100'>
            <div className='flex-1 cursor-pointer'><Link to={"/"}> logo</Link></div>
            <div className='flex-auto flex justify-between'>
                <div className='cursor-pointer'><Link to={"/"}>Home</Link></div>
            {  user?.username ? "":  (<div className='cursor-pointer'><Link to={"/login"}>login</Link></div>)}
            {  user?.username ? "":  (<div className='cursor-pointer'><Link to={"/register"}>Register</Link></div>)}
                <div className='cursor-pointer'><Link to={"/carts"}>Cart</Link></div>
                <div className='cursor-pointer'><Link to={"/item"}>Create New Ad</Link></div>
             {user?.username && <div className='cursor-pointer'> {user.username}</div>}
             {user?.username ? <div className='cursor-pointer' onClick={logout}>Log Out</div>:""
                }
                </div>
        </nav>
        </>
    )
}




export default NavBar