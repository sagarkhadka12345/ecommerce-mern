import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { itemEndPoint, userEndPoint } from "../Apis";
import axios, { AxiosError } from "axios";
import { User } from "../types/types";
import swal from "sweetalert2";
import { setTextRange } from "typescript";
import { ZodError } from "zod";

const createItemEndPoint = `${itemEndPoint}/createItem`;

const api = `${userEndPoint}/findUser`;

const CreateItem = () => {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [type, setType] = useState<string>();
  const [seller, setSeller] = useState<User>();
  const [img, setImg] = useState<string>();

  useEffect(() => {
    axios
      .get(`${api}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSeller(res.data);
      });
  }, [api]);
  const createItem = async (e: any) => {
    e.preventDefault();

    await axios
      .post(
        createItemEndPoint,
        {
          name,
          price,
          type,
          img,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err: AxiosError) =>
        swal.fire({
          html: (err.response?.data as Array<any>)[0]?.errors.issues[0].message,
          showCloseButton: true,
          showConfirmButton: true,
        })
      );
  };

  return (
    <div className="flex  h-[80.5vh] justify-center items-center mx-8 ">
      <form
        onSubmit={createItem}
        method="POST"
        className="border flex flex-col text-indigo-400 p-4 sm:w-[40vw] md:w-[30vw] w-full bg-gray-100 shadow-md "
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="border  py-1 text-indigo-400 my-1"
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
          className="border  py-1 text-indigo-400 my-1"
        />
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          name="type"
          onChange={(e) => {
            setType(e.target.value);
          }}
          className="border  py-1 text-indigo-400 my-1"
        />
        <label htmlFor="img">Image:</label>
        <input
          type="text"
          name="img"
          className="border  py-1 text-indigo-400 "
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <div className="flex justify-center">
          {" "}
          <input
            type="submit"
            value="Create Item"
            className=" hover:cursor-pointer mt-4 border-2 bg-white shadow-sm p-2 flex justify-center"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
