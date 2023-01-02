import axios from "axios";
import React, { useEffect, useState } from "react";
import { orderEndPoint } from "../Apis";
import swal from "sweetalert2";
import { Order as TOrder, User } from "../types/types";
import { userEndPoint } from "../Apis";
import moment from "moment";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const api = `${userEndPoint}/findUser`;
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${orderEndPoint}/getAllOrders`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setOrders(user?.username === "sagarkhadkammm"
      ? res.data
      : res.data.filter((item: TOrder) => item.username === user?.username));
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
      swal
        .fire({
          icon: "success",
          title: "Success",
          text: "Order delete success",
        })
        .then(() => window.location.reload());
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
    <div className="w-full h-max p-8">
      <table className="w-full">
        <thead>
          <tr>
            <td className="px-4 py-2 bg-gray-400"> Order ID</td>
            <td className="px-4 py-2 bg-gray-400">Order date</td>
            <td className="px-4 py-2 bg-gray-400">User</td>
            <td className="px-4 py-2 bg-gray-400">Total Price</td>
            <td className="px-4 py-2 bg-gray-400"></td>
          </tr>
        </thead>
        <tbody>
          {orders.map((item: TOrder, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b-2 border-gray-400">
                {" "}
                {item.orderId}
              </td>
              <td className="px-4 py-2 border-b-2 border-gray-400">
                {moment.unix(+item.date).format("YYYY-MM-DD")}
              </td>

              <td className="px-4 py-2 border-b-2 border-gray-400">
                {item.username}
              </td>
              <td className="px-4 py-2 border-b-2 border-gray-400">
                {item.totalPrice}
              </td>
              {user?.username === "sagarkhadkammm" && (
                <td className="px-4 py-2 border-b-2 border-gray-400">
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
