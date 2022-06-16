import { CartModel, Cart } from "../Models/cart.model";
import { Order, OrderModel } from "../Models/order.model";
import { UserModel, User } from "../Models/user.model";
import mongoose from "mongoose";



export async function orderService(username: Order["username"], items:Order["items"], totalPrice:Order["totalPrice"]) {
    const order = await OrderModel.create({
        _id: new mongoose.Types.ObjectId(),
        username, items, totalPrice


    })
    return order.save()


}
export async function pushItemsService(username:Order["username"], item:Order["items"]){
    const order =await OrderModel.findOneAndUpdate({
        username:username
    },{
        $push:{
            items:item
        }
    })

    return order
}
export  function findOrderServiceByUsername(username:Order["username"]){
    return  OrderModel.find({
        username
    })
}