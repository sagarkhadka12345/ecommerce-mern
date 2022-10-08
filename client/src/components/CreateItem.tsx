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
  const [price, setPrice] = useState<string>();
  const [type, setType] = useState<string>();
  const [seller, setSeller] = useState<User>();
  const [img, setImg] = useState<File | null>();

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
    const formData = new FormData();
    formData.append("name", name as string);
    formData.append("price", price as string);
    formData.append("type", type as string);
    formData.append("itemImage", img as File);

    await axios
      .post(createItemEndPoint, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        swal.fire({
          html: "Item Posted Successfully",
          showCloseButton: true,
          showConfirmButton: true,
        });
      })
      .catch((err: AxiosError) => {
        if (err.status === "406") {
          swal.fire({
            html: err.response?.data as string,
            showCloseButton: true,
            showConfirmButton: true,
          });
        } else {
          if ((err.response?.data as Array<any>)[0]?.errors == undefined) {
            return swal.fire({
              html: err.response?.data as string,
              showCloseButton: true,
              showConfirmButton: true,
            });
          }
          swal.fire({
            html: (err.response?.data as Array<any>)[0]?.errors.issues[0]
              .message,
            showCloseButton: true,
            showConfirmButton: true,
          });
        }
      });
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
            setPrice(e.target.value);
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
        <label htmlFor="itemImage">Image:</label>
        <input
          type="file"
          name="itemImage"
          className="border  py-1 text-indigo-400 "
          onChange={(e) => {
            setImg(e.target.files && e.target.files[0]);
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
