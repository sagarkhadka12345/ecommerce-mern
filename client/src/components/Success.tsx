import React, { useEffect, useState } from "react";
import axios from "axios";
import { cartEndPoint, orderEndPoint, userEndPoint } from "../Apis";
import { CartItem } from "../types/types";
const Success = () => {
  const emptyCartEndPoint = `${cartEndPoint}/emptyCart`;
  const createOrderEndPoint = `${orderEndPoint}/createOrder`;
  const findCartEndPoint = `${cartEndPoint}/findCart`;
  const removeItemEndPoint = `${cartEndPoint}/remove`;
  const api = `${userEndPoint}/findUser`;
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`${api}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        setUser(res.data);
      })
      .catch((err) => console.log("Please login or create User"));
  }, [api]);
  async function check(item: Array<any>) {
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
      { username: user },
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
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        setCart(res.data);
        check(res.data.map((data: any) => data.items as any)[0]).then(() => {
          window.location.href = "/carts";
        });
      });
  };

  useEffect(() => {
    fetchCart();
    // window.location.href = "/cart";
  }, [user]);

  return <div></div>;
};

export default Success;
