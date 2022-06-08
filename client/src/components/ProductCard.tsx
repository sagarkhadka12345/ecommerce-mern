import React, { useState, useEffect } from 'react'
import { Item } from '../types/types'
import { cartEndPoint } from '../Apis'

import axios from "axios";
const username = "sagar12345"

const ProductCard = (props: Item) => {
  const [cart, setCart] = useState({})
  const upDateCartEndPoint = `${cartEndPoint}/update/${username}`
  const findCartEndPoint = `${cartEndPoint}/findCart/${username}`
  useEffect(() => {
    axios.get(findCartEndPoint).then((res) => { setCart(res.data) })
  },[findCartEndPoint])
  const addToCart = () => {

    try {
      axios.post(upDateCartEndPoint,{
   
        "item":{
          "name": props.name,
           "sellerId": props.sellerId,
           "price": props.price,
           "type": props.type,
           "quantity":props.quantity
       }    
   

        
      }).then((res)=>{console.log(res)})
      }
    
    catch (err) {
      console.error(err)
    }
  }

  return (
    <div >
      <div className='cart flex flex-col p-2 m-4 bg-slate-400'>
        <div className='img-container p-2'>{props.name}</div>
        <div className='cart-name-container p-x-2 border'>{props.name}</div>
        <div className='seller-container'>{props.sellerId}</div>
        <div className='price'>{props.price}</div>
        <div className='quantity'>{props.quantity} </div>
        <div className='type'>{props.type}</div>
        <img className='img' src={props.img}></img>
        <button onClick={addToCart}>Set to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard