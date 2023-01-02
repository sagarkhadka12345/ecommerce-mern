export interface Item {
  sellerId: string;
  img: string;
  quantity: number;
  _id: string;
  name: string;
  seller: string;
  price: number;
  type: string;
  productId: string;
  _v: number;
}
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  img: string;
  seller: string;
}
export interface Cart {
  username: string;
  items: Array<CartItem>;
  modifiedTime: string;
  totalQty: number;
  totalPrice: number;
}
export interface Order {
  orderId: string;
  items: Array<CartItem>;
  username: string;
  seller: string;
  date: string;
  productId: string;
  totalPrice: number;
}
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
  address: string;
}
export interface Token {
  username: string;
  iat: string;
}
