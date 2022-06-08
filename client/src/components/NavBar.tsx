import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { userEndPoint } from '../Apis'
import { User } from "../types/types"




const username = "sagarkhadka"



const NavBar: React.FC = (): JSX.Element => {
    const api = `${userEndPoint}/find/${username}`
    const [user, setUser] = useState<any[]>([])
    useEffect(() => {
        axios.get(`${userEndPoint}/find/${username}`).then((res) => { setUser(res.data) })
    }, [api])



    return (
        <><nav>
            <div>logo</div>
            <div> {
                user.length === 0 ? "Login" : user.map((user: User) => (user.username))}</div>
        </nav>
        </>
    )
}




export default NavBar