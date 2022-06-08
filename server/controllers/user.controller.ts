import express, { NextFunction, Request, Response } from "express"
import { LoginType, UserModel } from "../Models/user.model";
import mongoose from "mongoose";
import { RegisterUserBody, registerUserSchema } from "../Models/user.model";
// import {validateUserService} from "../service/user.service"

import dotenv from "dotenv"

import { changePasswordService, findUserService } from "../service/user.service";
dotenv.config();



export const createUserHandler = async (req: Request<{},{}, RegisterUserBody>, res: Response) => {
    const {firstname, lastname, email, password, username, address } = req.body
    
    const user = await UserModel.create({
        _id: new mongoose.Types.ObjectId(),
        email,
        password,
        username,
        address,
        firstname,
        lastname,


    })
    return user.save()
        .then(() => {
            res.send(user)
        })
        .catch((err: any) => {
            if (err.code === 1000) {
                return res.send("User already cready")
            }
            return res.send(err.message).status(200)
        })
}
export const loginUser =async (req:Request<{}, {}, LoginType>, res:Response) => {
    const {username, password} = req.body 
   const user = await findUserService(username)
   if (user &&  await user.comparePassword(password)) {
    return res.send(user).status(200)
  }

   return res
   .status(500)
   .send("Invalid email or password");
}

export const findAllUsers = async (req:Request, res:Response) =>{
 
    const item = await UserModel.find()
    return res.status(200).send(item)
  
  
  }

export const changePassword = async (req:Request, res:Response)=>{
    const {username} = req.params
    const {password, newPassword }= req.body
    const user = await findUserService(username)
    if(user && await user.comparePassword(password)){
        await changePasswordService(username, password, newPassword) 
        return res.status(200).send(user)
    }
    return res
    .status(500)
    .send("Invalid email or password");


}
//   export const validateUser =async (req:Request, res:Response, next:NextFunction)=>{
//     const  {username, password, email }= req.body
//    const user = await validateUserService(username, password, email)
//    next()

// }







