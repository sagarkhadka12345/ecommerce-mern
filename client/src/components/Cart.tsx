import React, { useState, useEffect } from 'react'
import { cartEndPoint } from '../Apis'
import axios from 'axios'
import { Cart } from '../types/types'
import ConfirmCheckout from './ConfirmCheckout'
const username = "00G"



const CartComponent: React.FC = (): JSX.Element => {
  //states 
  const [cart, setCart] = useState<any[]>([])
  const [totalQtyState, setTotalQty] = useState<number>(0)
  const [totalPriceState, setTotalPrice] = useState<number>(0)
  const [checkout, setCheckOut] = useState(false)

  //api points
  const upDateCartEndPoint = `${cartEndPoint}/update/${username}`
  const emptyCartEndPoint = `${cartEndPoint}/deleteCart/${username}`
  const findCartEndPoint = `${cartEndPoint}/findCart/${username}`
  //some variables for the data
  let totalQty = 0;
  let qty = 0;
  let totalPrice = 0;
  let price = 0;
  useEffect(() => {
    axios.get(findCartEndPoint).then((res) => { setCart(res.data) })
  }, [])


  const checkOutHandler = () => {
    checkout ? setCheckOut(false) : setCheckOut(true)
    setTotalQty(totalQty)
    setTotalPrice(totalPrice)
  }




  if (cart) {
    return (


      <div className='cart'>
        {
          cart.map((data: Cart) => (
            <div className='item'>
              {
                data.items.map((data) => (<div>
                  <div className='itemName'>{data.name}</div>
                  <div className='itemPrice'>{data.price}</div>
                  <div className='itemQty'>{data.quantity}</div>
                  <div className='itemProductId'>{data.productId}</div>
                  <img className='itemImage' src={data.img}></img>
                </div>))
              }
              <div className='totalQty'>TotalQuantity:
                {totalQty = data.items.reduce((currentSum, value) => {
                  return qty += value.quantity

                }, 0)}
              </div>
              <div className='totalPrice'>TotalPrice:
                {
                  totalPrice = data.items.reduce((currentPrice, value) => {
                    return price += value.price
                  }, 0)
                }
              </div>
              <button onClick={checkOutHandler} >Check Out {
        checkout && (<ConfirmCheckout 
      totalQtyState = {totalQtyState}/>)
        }
        </button>
            </div>
            


          )
          )

        }



      </div>

    )
  }
  else {
    return (
      <div> Cart is Empty </div>
    )
  }
}

export default CartComponent