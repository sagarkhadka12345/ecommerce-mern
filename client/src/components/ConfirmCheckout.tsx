import React from 'react'
import { Cart } from '../types/types'
import { cartEndPoint, orderEndPoint } from '../Apis'
import axios from 'axios'

const username = "sagar"

const confirmCheckout = (props:{"totalQtyState":number}) => {
  const emptyCartEndPoint = `${cartEndPoint}/deleteCart/${username}`
  const createOrderEndPoint = `${orderEndPoint}/createOrder/${username}`
  const checkOutHandler =()=>{
    try{
      // axios.post(emptyCartEndPoint,{
      //   "item":[]    
      // }).then(res=>console.log(res)
      // )
      axios.post(createOrderEndPoint,{
        "user":"sagar",
        "sellerId":"seller",
        "productId":"00f",
        "totalPrice":props.totalQtyState

      })
      window.location.reload()
      

    }
    catch(err){
      console.log(err);
      
    }
  }
  return (
    <>    <div>
         Are You sure You want to checkout??
         <div>{props.totalQtyState}</div>

    </div>
    <div><button onClick={checkOutHandler}> Yes!! Check Out</button>
    <button onClick={()=>{
      window.location.reload()
    }}>No I want to recheck</button>
      </div></>
    
  )
}

export default confirmCheckout