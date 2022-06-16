import React, { useState, useEffect, useRef } from "react";
import { cartEndPoint, orderEndPoint } from "../Apis";
import axios from "axios";
import { Cart, CartItem } from "../types/types";
import image from "../images/ab.jpeg";
import swal from "sweetalert2";

interface received {
  0: {
    items: Array<CartItem>;
  };
}

const CartComponent: React.FC = (): JSX.Element => {
  //states
  const [cart, setCart] = useState<Cart[]>([]);
  const [carts, setCarts] = useState<received>();
  const [totalQtyState, setTotalQty] = useState<number>(0);
  const [totalPriceState, setTotalPrice] = useState<number>(0);
  // const [checkout, setCheckOut] = useState(false);
  const [productId, setProductId] = useState<string>("");
  const [orderItem, setOrderItem] = useState<any[]>([]);

  //api points
  // const upDateCartEndPoint = `${cartEndPoint}/update/${username}`
  // const emptyCartEndPoint = `${cartEndPoint}/deleteCart/${username}`
  const findCartEndPoint = `${cartEndPoint}/findCart`;
  const removeItemEndPoint = `${cartEndPoint}/remove`;

  //some variables for the data
  let totalQty = 0;

  let totalPrice = 0;

  useEffect(() => {
    axios
      .get(findCartEndPoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCart(res.data);
        return setCarts(res.data);
      });
  }, []);

  const remove = () => {
    console.log(productId);

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

  const checkout = () => {
    swal
      .fire({
        html: "<p>Do you really want to check out</p>",
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          checkOutHandler();
        } else if (result.isDenied) {
          return window.location.reload();
        }
      });
  };

  const checkOutHandler = () => {
    setTotalQty(totalQty);
    setTotalPrice(totalPrice);
    if (carts) {
      setOrderItem(carts[0].items);
    }
    axios.post(
      createOrderEndPoint,
      {
        items: orderItem,
        totalPrice: totalPriceState,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    axios.post(
      emptyCartEndPoint,
      { username: "" },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    window.location.reload();
  };

  if (cart.length > 0) {
    return (
      <div className="border p-2 bg-gray-100 h-[100vh] mb-12">
        Cart:
        {cart.map((data: Cart, index) => (
          <div key={index}>
            <div
              key={index}
              className="item my-2 py-2 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-2 shadow-sm"
            >
              {data.items.map((data: CartItem, index) => (
                <div key={index} className="border border-2  bg-white">
                  <div className="m-2 relative flex flex-col">
                    <img
                      className="itemImage my-2"
                      src={image}
                      alt="image not Found"
                    ></img>
                    <div
                      className="absolute sm:right-1 md:right-0 top-1 hover:cursor-pointer text-xl"
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
                {
                  (totalQty = data.items.reduce((currentSum, value) => {
                    return (currentSum += value.quantity);
                  }, 0))
                }
              </div>
              <div className="totalPrice py-2">
                TotalPrice:
                {
                  (totalPrice = data.items.reduce((currentPrice, value) => {
                    return (currentPrice += value.price * value.quantity);
                  }, 0))
                }
              </div>

              <button onClick={checkout}>Check out</button>
            </div>
            {}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div> There is no item in the cart. Please Add Items to your Cart</div>
      </div>
    );
  }
};
export default CartComponent;
