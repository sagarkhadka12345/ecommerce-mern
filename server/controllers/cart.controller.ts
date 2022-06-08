import { Request, Response } from "express";
import { CartModel } from "../Models/cart.model";
// import { findCartsBySeller } from "../service/user.service";
// import { findCarts } from "../service/user.service";
import mongoose from "mongoose";
import logger from "../logger/logger";
import {updateCartService, findCartService, emptyCartService} from "../service/cart.service"



export async function findAll(req:Request,res:Response){
    const Cart = await CartModel.find()
    return res.send(Cart).status(200)
}

export const updateCartHandler= async (req:Request, res:Response)=>{
  const { username}= req.params;
  const {item} = req.body;
  const carts = await updateCartService(username, item)
  return res.send(carts).status(200) 
}



export const createCartHandler = async (req:Request, res:Response)=>{
  const {username, totalQty, totalPrice, items} = req.body
    
  const Cart =  await CartModel.create({
      _id: new mongoose.Types.ObjectId(),
      username,
      items,
      totalQty,
      totalPrice

  })
      
  return Cart.save().then((Cart) => {
    res.status(200).send({Cart});
  })
  .catch((err:any) => {
    res.status(500).send(err);
  });

    
}

export const deleteCartHandler = async(req:Request, res:Response)=>{
    const username = req.params.username;
    const {item} = req.body;
    const cart = await emptyCartService(username, item);
    return res.status(200).send("Cart deleted successful")
}
export const findCart = async(req:Request, res:Response)=>{
   const username= req.params.username;
   const Carts = await findCartService(username);
   return res.send(Carts).status(200)

}