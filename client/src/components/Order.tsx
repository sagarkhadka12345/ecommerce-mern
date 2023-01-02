import axios from "axios";
import React, { useEffect, useState } from "react";
import { orderEndPoint } from "../Apis";
import swal from "sweetalert2";
import { Order as TOrder, User } from "../types/types";
import { userEndPoint } from "../Apis";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const api = `${userEndPoint}/findUser`;
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${orderEndPoint}/getAllOrders`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setOrders(res.data);
    } catch (error) {
      swal.fire({
        icon: "error",
        html: "Error while Fetching Order",
        showCloseButton: true,
      });
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const handleOrderDelete = async (id: string) => {
    try {
      const resp = await axios.delete(`${orderEndPoint}/deleteOrder/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      swal.fire({
        icon: "success",
        title: "Success",
        text: "Order delete success",
      });
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Order delete error",
      });
    }
  };
  const [user, setUser] = useState<User>();
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
  return (
    <div className="w-full h-max">
      <table>
        <thead>
          <tr>
            <td> Order ID</td>
            <td>Order date</td>
            <td>User</td>

            <td></td>
          </tr>
        </thead>
        <tbody>
          {orders.map((item: TOrder, index) => (
            <tr key={index}>
              <td> {item.orderId}</td>
              <td>{item.date}</td>

              <td>{item.username}</td>
              {user?.username === "sagarkhadkammm" && (
                <td>
                  <div
                    onClick={() => handleOrderDelete(item.orderId)}
                    className="cursor-pointer"
                  >
                    X
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
