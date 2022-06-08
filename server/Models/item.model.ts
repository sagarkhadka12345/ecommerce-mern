import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";



export class Item{

  @prop({required:true})
  name:string
  @prop({required:true})
  productId:string
  @prop({required:true, default:"unknown"})
  sellerId:string
  @prop({required:true})
  price:number
  @prop({required:true})
  type:string
  @prop({required:true, default:"img"})
  img:HTMLImageElement | string
  @prop({required:true, default:0})
  quantity:number


}


export const ItemModel = getModelForClass(Item)