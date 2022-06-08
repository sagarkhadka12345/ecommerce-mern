import { Item, ItemModel } from "../Models/item.model";

export function findItemsBySellerService(sellerId: Item["sellerId"]) {
    return ItemModel.find({
        sellerId
    })
}

export function findItemsByTypeService(type : Item["type"]){
    return ItemModel.find({
        type
    })
}