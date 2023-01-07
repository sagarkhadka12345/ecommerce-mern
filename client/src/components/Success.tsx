import React, { useEffect, useState } from "react";
import axios from "axios";
import { cartEndPoint, orderEndPoint } from "../Apis";
import { CartItem } from "../types/types";
const Success = () => {
  const emptyCartEndPoint = `${cartEndPoint}/emptyCart`;
  const createOrderEndPoint = `${orderEndPoint}/createOrder`;
  const findCartEndPoint = `${cartEndPoint}/findCart`;
  const removeItemEndPoint = `${cartEndPoint}/remove`;
  async function check() {
    await axios
      .post(
        createOrderEndPoint,
        {
          items: item,
          totalPrice: item.reduce(
            (p: any, s: any) => s.price * s.quantity + p,
            0
          ),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((re) => console.log(re))
      .catch((err) => console.log(err));

    await axios.post(
      emptyCartEndPoint,
      { username: "" },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }
  const [cart, setCart] = useState([]);
  const item = cart.map((data: any) => data.items as any)[0];
  const fetchCart = async () => {
    axios
      .get(findCartEndPoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCart(res.data);
      });
    await check();
  };
  useEffect(() => {
    fetchCart();
    window.location.href = "/cart";
  }, []);

  return <div></div>;
};

export default Success;
