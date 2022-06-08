import { CartModel, Cart } from "../Models/cart.model";
import { Order, OrderModel } from "../Models/order.model";
import { UserModel, User } from "../Models/user.model";
import mongoose from "mongoose";
import crypto from "crypto"


export async function orderService(username: Order["username"], sellerId: Order["sellerId"], productId: Order["productId"], totalPrice:Order["totalPrice"]) {
    return await OrderModel.create({
        _id: new mongoose.Types.ObjectId(),
        username, sellerId, productId,totalPrice


    })

}
export  function findOrderServiceByUsername(username:Order["username"]){
    return  OrderModel.find({
        username: username
    })
}