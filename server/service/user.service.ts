

import { User, UserModel } from "../Models/user.model";
import bcrypt from "bcrypt"







export function findUserService(username : User["username"]){
    return UserModel.findOne({
        username
    })
}


export async function changePasswordService(username:User["username"], password:User["password"], newPassword:User["password"]){
    return UserModel.updateOne({
        username
    },{
        $set:{
            password: await bcrypt.hash(newPassword, 10)
        }
    })
}



