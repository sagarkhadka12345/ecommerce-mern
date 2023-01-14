import React, { useEffect, useState } from "react";
import axios from "axios";
import { cartEndPoint, orderEndPoint, userEndPoint } from "../Apis";
import { Cart, CartItem } from "../types/types";
const Success = () => {
  const emptyCartEndPoint = `${cartEndPoint}/emptyCart`;
  const createOrderEndPoint = `${orderEndPoint}/createOrder`;
  const findCartEndPoint = `${cartEndPoint}/findCart`;
  const removeItemEndPoint = `${cartEndPoint}/remove`;
  const api = `${userEndPoint}/findUser`;
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${api}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log("Please login or create User"));
  }, [api]);
  async function check(item: Array<any>) {
    const res = await axios.get(findCartEndPoint, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    await axios.post(
      emptyCartEndPoint,
      { username: user, items: res.data[0].items },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("====================================");
    console.log("I am Here");
    console.log("====================================");
    await axios.post(
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
    );
  }

  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    axios
      .get(findCartEndPoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCart(res.data);
        check(res.data.map((data: any) => data.items as any)[0]).then(() => {
          window.location.href = "/carts";
        });
      });
  };

  useEffect(() => {
    fetchCart();
    // window.location.href = "/cart";
  }, []);

  return <div></div>;
};

export default Success;
