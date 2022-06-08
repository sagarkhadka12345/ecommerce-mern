export interface Item {
    img: string,
    quantity: number,
    _id: string,
    name: string,
    sellerId: string,
    price: number,
    type: string,
    _v: number
}
export interface CartItem {
    productId:string,
    quantity:number,
    price:number,
    name:string,
    img:string
}
export interface Cart{
    username:string,
    items:Array<CartItem>,
    modifiedTime:string,
    totalQty:number,
    totalPrice:number
}
export interface Order{
    orderId:string,
    username:string,
    sellerId:string,
    date:string,
    productId:string
}
export interface User{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    username:string,
    address:string
}