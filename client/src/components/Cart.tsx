import React, { useState, useEffect, useRef } from "react";
import { cartEndPoint, orderEndPoint } from "../Apis";
import axios from "axios";
import { Cart, CartItem } from "../types/types";
import image from "../images/ab.jpeg";
import swal from "sweetalert2";
import getStripe from "../getStripe";

interface received {
  0: {
    items: Array<CartItem>;
  };
}

const CartComponent: React.FC = (): JSX.Element => {
  async function handleStripe() {
    try {
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            quantity: 1,
            price: "price_1MKkzrG9ZwN3X5brnJgJgwgT",
          },
        ],
        mode: "subscription",
        successUrl: `http://localhost:3002/success`,
        cancelUrl: `http://localhost:3002/cancel`,
        customerEmail: "customer@email.com",
      });
      if (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    } catch (error) {
      console.log("====================================");
      console.log("Error");
      console.log("====================================");
    }
  }
  //states
  const [cart, setCart] = useState<Cart[]>([]);
  // const [carts, setCarts] = useState<received>();
  // const [totalQtyState, setTotalQty] = useState<number>(0);
  // const [totalPriceState, setTotalPrice] = useState<number>(0);
  // const [checkout, setCheckOut] = useState(false);
  const [productId, setProductId] = useState<string>("");
  const [orderItem, setOrderItem] = useState<any[]>([]);

  //api points
  // const upDateCartEndPoint = `${cartEndPoint}/update/${username}`
  // const emptyCartEndPoint = `${cartEndPoint}/deleteCart/${username}`
  const findCartEndPoint = `${cartEndPoint}/findCart`;
  const removeItemEndPoint = `${cartEndPoint}/remove`;

  //some variables for the data
  const totalQty = 0;

  let totalPrice = 0;

  useEffect(() => {
    axios
      .get(findCartEndPoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        return setCart(res.data);
      });
  }, []);

  const remove = () => {
    axios.post(
      removeItemEndPoint,
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (productId != "") {
      window.location.reload();
    }

    // window.location.reload()
  };
  const emptyCartEndPoint = `${cartEndPoint}/emptyCart`;
  const createOrderEndPoint = `${orderEndPoint}/createOrder`;

  // const checkout = () => {};
  const isInitialMount = useRef(true);
  const item = cart.map((data: any) => data.items as any);

  const checkOutHandler = async () => {
    swal
      .fire({
        html: "<p>Do you really want to check out</p>",
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleStripe();
        } else if (result.isDenied) {
          return window.location.reload();
        }
      });
  };

  if (cart.length > 0) {
    return (
      <div className="border p-2 bg-gray-100 sm:h-[100vh] sm:pb-12 ">
        Cart:
        {cart.map((data: Cart, index) => (
          <div key={index} className="pb-16 mb-12 ">
            <div
              key={index}
              className="item my-2 py-2 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-2 shadow-sm"
            >
              {data.items.map((data: CartItem, index) => (
                <div
                  key={index}
                  className="border-2 relative  bg-white m-4 p-4"
                >
                  <div className="m-2  flex flex-col">
                    <img
                      className="itemImage my-2"
                      src={data.img}
                      alt="image not Found"
                    ></img>
                    <div
                      className="absolute right-2  top-3 hover:cursor-pointer text-2xl"
                      onClick={() => {
                        setProductId(data.productId);
                        remove();
                      }}
                    >
                      X
                    </div>
                  </div>
                  <div className="flex justify-between mx-2 items-center">
                    <div className="itemName my-2 ">{data.name}</div>
                    <div className="itemPrice my-2">${data.price}</div>
                  </div>

                  <div className="itemQty my-2 mb-4  mx-2">
                    Quantity: {data.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="totalQty py-2">
                TotalQuantity:
                {data.items.reduce((currentSum, value) => {
                  return (currentSum += value.quantity);
                }, 0)}
              </div>
              <div className="totalPrice py-2">
                TotalPrice:
                {
                  (totalPrice = data.items.reduce((currentPrice, value) => {
                    return (currentPrice += value.price * value.quantity);
                  }, 0))
                }
              </div>

              <button
                onClick={() => {
                  checkOutHandler();
                }}
                className="border-2 bg-green-200 p-4 border-indigo-600 bg-indigo-500"
              >
                Check out
              </button>
            </div>
            {}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div> Please login First </div>
      </div>
    );
  }
};
export default CartComponent;
