import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import crypto from "crypto"


export class Item{

  @prop({required:true})
  name:string
  @prop({required:true, default:crypto.randomBytes(12).toString('hex')})
  productId:string
  @prop({required:true, default:"unknown"})
  seller:string
  @prop({required:true})
  price:number
  @prop({required:true})
  type:string
  @prop({required:true, default:"img"})
  img:string
  @prop({required:true, default:0})
  quantity:number


}


export const ItemModel = getModelForClass(Item)