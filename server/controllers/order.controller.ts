import { OrderModel, Order } from "../Models/order.model";
import mongoose from "mongoose";
import express, { Request, Response} from "express" ;
import { findOrderServiceByUsername, pushItemsService } from "../service/order.service";






export const createOrderHandler = async (req:Request, res:Response)=>{

    const { username, items, totalPrice} = req.body
      
    const Cart =  await OrderModel.create({
        _id: new mongoose.Types.ObjectId(),
        username,
        items,
        totalPrice
  
    })
        
    return Cart.save().then((Cart) => {
      res.status(200).send(Cart)
    })
    .catch((err:any) => {
      res.status(500).send(err);
    });
}
export  const findOrderByUsername = async (req:Request, res:Response) => {
    const {username}= req.params;
    const orders = await findOrderServiceByUsername(username)
    return res.send(orders).status(200)   
} 

export const pushItems = async (req:Request,res:Response)=>{

    const {username, item} = req.body;
    const order = pushItemsService(username, item)
    return res.send(order)
}