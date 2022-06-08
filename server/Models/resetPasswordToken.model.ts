import { getModelForClass, prop , Ref} from "@typegoose/typegoose"
import { string } from "zod"
import { User } from "./user.model";
 const currentDate = new Date();


export class resetPasswordTokenSchema {
    @prop({required:true, ref:()=>User})
    username:Ref<User>
    @prop({default:currentDate.getTime()})
    createdDate:number
    @prop({required:true, default:new Date(currentDate.getTime() + 5*60000)})
    expiringDate:Date
} 