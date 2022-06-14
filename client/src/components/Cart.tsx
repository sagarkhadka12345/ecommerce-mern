import React, { useState, useEffect, useRef } from 'react'
import { cartEndPoint, orderEndPoint } from '../Apis'
import axios from 'axios'
import { Cart, CartItem } from '../types/types'
import ConfirmCheckout from './ConfirmCheckout'
import image from "../images/ab.jpeg";




interface received {
  0: {
    items:Array<CartItem>
  }
}

const CartComponent: React.FC = (): JSX.Element => {
  //states 
  const [cart, setCart] = useState<Cart[]>([])
  const [carts, setCarts] = useState<received>()
  const [totalQtyState, setTotalQty] = useState<number>(0)
  const [totalPriceState, setTotalPrice] = useState<number>(0)
  const [checkout, setCheckOut] = useState(false)
  const [productId, setProductId] = useState<string>("")
  const [orderItem, setOrderItem]= useState<any[]>([]);

  //api points
  // const upDateCartEndPoint = `${cartEndPoint}/update/${username}`
  // const emptyCartEndPoint = `${cartEndPoint}/deleteCart/${username}`
  const findCartEndPoint = `${cartEndPoint}/findCart`
  const removeItemEndPoint = `${cartEndPoint}/remove`
 
  //some variables for the data
  let totalQty= 0;
  let qty= 0;
  let totalPrice= 0;
  let price= 0;
  


 

  useEffect(() => {
    
    axios.get(findCartEndPoint,{
     headers:{
      "Authorization":"Bearer " +localStorage.getItem("token")
     }
    }).then((res) => {
      setCart(res.data);
      return setCarts(res.data)
    })
  }, [])



  const checkOutHandler = () => {
    checkout ? setCheckOut(false) : setCheckOut(true);
    setTotalQty(totalQty)
    setTotalPrice(totalPrice)
    if(carts){
      setOrderItem(carts[0].items)
    }
    

  }



const remove = ()=>{
     
   console.log(productId)

  axios.post(removeItemEndPoint,{
    "productId":productId
  },{
    headers:{
      "Authorization":"Bearer "+ localStorage.getItem("token")
    }
  })
   if(productId != ""){
    window.location.reload()
   }
  
 
 
// window.location.reload()

}


   if(cart.length>0){
  return (


    <div className='border p-2 bg-gray-100 h-[100vh]'>Cart:
      { 
        cart.map((data: Cart, index) => (

          <div key={index}className='item my-2 py-2 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
            data.items.map((data:CartItem, index) => (<div key={index} className='border border-2  m-2 shadow-sm bg-white'>
                <div  className='m-2 relative'><img className='itemImage my-2' src={image} alt="image not Found"></img>
                  <div className='absolute sm:right-1 md:right-0 top-1 hover:cursor-pointer text-xl' onClick={() => {setProductId(data.productId); remove() }}>
                    X</div>
                   
                </div>
                {
                  data.productId
                }
                <div className='flex justify-between mx-2 items-center'>
                
                  <div className='itemName my-2 '>{data.name}</div>
                  <div className='itemPrice my-2'>${data.price}</div>
                </div>

                <div className='itemQty my-2 mb-4  mx-2'>Quantity: {data.quantity}</div>
                

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
                  return price += (value.price* value.quantity)
                }, 0) }

            </div>
           
            <button onClick={checkOutHandler} >Check Out </button>
            {
              checkout && <ConfirmCheckout
                items={orderItem}
                totalQtyState={totalQtyState}
                totalPriceState={totalPriceState} />
            }

          </div>

        

        )
        )

      }



    </div>

  )
}else{
  return(<div><div> There is no item in the cart. Please Add Items to your Cart</div></div>
  )
}
}
export default CartComponent