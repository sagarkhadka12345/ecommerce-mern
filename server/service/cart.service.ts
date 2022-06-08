import { Cart, CartModel } from "../Models/cart.model";
import {User, UserModel} from "../Models/user.model"


export async function updateCartService(username : User["username"], item:object){  
       
     return await CartModel.updateOne(

          {
              username
          },
          {
            $push:{
            items:item
          } 
          }

      )
        



}
export async function findCartService(username:Cart["username"]){
  return await CartModel.find({
    username
  })
}
export async function emptyCartService(username : User["username"], item:object){  
       
  return await CartModel.updateOne(

       {
           username
       },
       {
         $set:{
         items:item
       } 
       }

   )
     



}