import { NextFunction , Request, Response} from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { nextTick } from "process";





export function authenticateToken(req:Request, res:Response, next:NextFunction){
  const authHeaders = req.headers["authorization"]
  const token = authHeaders && authHeaders.split(" ")[1]
  if(token == null){
      return res.status(400)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, username)=>{
   if(err) return res.status(403)
   else{
      req.body.username = username
      next()
   }
  })
  
}