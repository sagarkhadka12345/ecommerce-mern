import React, { useEffect, useState } from 'react'
import { Cart, CartItem } from '../types/types'
import { cartEndPoint, orderEndPoint } from '../Apis'
import axios from 'axios'




interface Iprops {
  items:any[],
  totalQtyState :number,
  totalPriceState:number
}

const ConfirmCheckout = (props:Iprops):JSX.Element => {
  
   



  const emptyCartEndPoint = `${cartEndPoint}/emptyCart`
  const createOrderEndPoint = `${orderEndPoint}/createOrder`

  const checkOutHandler=  () => {

    
       axios.post(createOrderEndPoint, {
        items: props.items,
        totalPrice: props.totalPriceState

      },{headers:{
        "Authorization":"Bearer "+ localStorage.getItem("token")
      }})
      
      axios.post(emptyCartEndPoint,{username:""},{headers:{
        "Authorization":"Bearer "+ localStorage.getItem("token")
      }});
      window.location.reload()


    }
    
    
 
  
    
  if(props){
    return (
      <>    <div>
        Are You sure You want to checkout??
        <div>The total number of the Products is :</div>
        <div> {props.totalQtyState}
        </div>
        <div>The total price products is {props.totalPriceState} </div>
      </div>
        <div>
          <button onClick={checkOutHandler}> Yes!! Check Out</button>
          <button onClick={() => {
            window.location.reload()
          }}>No I want to recheck</button>
        </div></>

    )}
    else{
      return(
        <div>Cart not available</div>
      )
    }
  }



export default ConfirmCheckout