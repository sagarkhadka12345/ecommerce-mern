import React, { useEffect, useState } from "react";
import axios from "axios";
import { cartEndPoint, orderEndPoint } from "../Apis";
import { CartItem } from "../types/types";
const Success = () => {
  const emptyCartEndPoint = `${cartEndPoint}/emptyCart`;
  const createOrderEndPoint = `${orderEndPoint}/createOrder`;
  const findCartEndPoint = `${cartEndPoint}/findCart`;
  const removeItemEndPoint = `${cartEndPoint}/remove`;
  const [cart, setCart] = useState([]);
  const item = cart.map((data: any) => data.items as any)[0];

  useEffect(() => {
    axios
      .get(findCartEndPoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        return setCart(res.data);
      })
      .catch((err: any) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
    check();
    // window.location.href = "/carts";
  }, []);

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

  return <div></div>;
};

export default Success;
