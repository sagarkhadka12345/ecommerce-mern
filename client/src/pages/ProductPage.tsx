import React, { useEffect, useState } from 'react'
import { itemEndPoint } from '../Apis'
import axios from 'axios'
import { Item } from '../types/types'
import ProductCard from '../components/ProductCard'
import { stringify } from 'querystring'
const username = "sagar12345"



const ProductPage: React.FC = (): JSX.Element => {
  const [categories, setCategories] = useState<string>("categories");

  const handleClick = (event:any)=>{
    setCategories(event.target.innerText)
  }
  const [product, setProduct] = useState<any[]>([])
  const api = `${itemEndPoint}/findAll`
  useEffect(() => {
    axios.get(api).then((res) => { setProduct(res.data) })
  },[api])
  


  if (product ) {

    return (
      <>
       <ul className='hover:cursor-pointer'>
         <li onClick={handleClick} >Categories</li>
         <li onClick={handleClick}>Desktop</li>
         <li onClick={handleClick}>Ipad</li>
         <li onClick={handleClick}>Laptop</li>
         <li onClick={handleClick}>Mobile</li></ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
       
          {product.map(
            (data: Item) => (
             <ProductCard
               
                img={data.img}
                name={data.name}
                price={data.price}
                type={data.type}
                sellerId={data.sellerId} quantity={0} _id={''} _v={0}/>)
              
          )}

        </div>
      </>
    )
  }
  else {
    return (
      <div></div>
    )
  }

}

export default ProductPage