import { OrderModel, Order } from "../Models/order.model";
import mongoose from "mongoose";
import express, { Request, Response} from "express" ;
import { findOrderServiceByUsername, orderService } from "../service/order.service";






export const orderHandler = async (req:Request, res:Response) =>{
    const {username}= req.params
    const { sellerId, productId, totalPrice} = req.body;
    let orders =await orderService(username, sellerId, productId, totalPrice)

    return res.send(orders).status(200)


}

export  const findOrderByUsername = async (req:Request, res:Response) => {
    const {username}= req.params;
    const orders = await findOrderServiceByUsername(username)
    return res.send(orders).status(200)   
} 