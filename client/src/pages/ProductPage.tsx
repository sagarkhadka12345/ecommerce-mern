import React, { MouseEventHandler, useEffect, useState } from "react";
import { itemEndPoint } from "../Apis";
import axios from "axios";
import { Item } from "../types/types";
import ProductCard from "../components/ProductCard";
import { stringify } from "querystring";
const username = "sagar12345";
import jwt from "jsonwebtoken";
import swal from "sweetalert2";

const ProductPage: React.FC = (): JSX.Element => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [product, setProduct] = useState<[Item]>();
  const [categories, setCategories] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const keywords = ["All", "Desktop", "Item", "Mobile", "Laptop", "PC"];

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCategories((event.target as HTMLDivElement).innerText);
  };

  const api = `${itemEndPoint}/findAll`;

  useEffect(() => {
    axios.get(api).then((res) => {
      setProduct(res.data);
    });
  }, [categories]);
  //  console.log(categories)

  const alertNow = () => {
    swal.fire("The item has been added to the cart successfully");
  };

  if (product) {
    return (
      <div className="relative bg-gray-100 pb-12 ">
        <div className="w-max m-auto py-4 shodow-md">
          <div className="rounded-md border-2">
            <input
              className="py-2 border bg-white px-0"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
            <button className="p-2 m-0">Search</button>
          </div>
        </div>

        <ul className="flex justify-between w-full px-4  border-y-2 overflow-x-scroll">
          {keywords.map((val, i) => (
            <div
              key={i}
              onClick={handleClick}
              className={
                categories === val
                  ? "cursor-pointer p-2 m-1 mb-4 px-4 rounded-md bg-indigo-400 shadow-md "
                  : "cursor-pointer p-2 m-1 mb-4 px-4 rounded-md bg-gray-200"
              }
            >
              {val}
            </div>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 px-4  ">
          {product.map((data: Item, index) =>
            categories === "All" && search === "" ? (
              <ProductCard
                key={index}
                img={data.img}
                name={data.name}
                price={data.price}
                type={data.type}
                seller={data.seller}
                productId={data.productId}
                quantity={1}
                _id={""}
                _v={0}
                sellerId={data.sellerId}
              />
            ) : data.type === categories &&
              data.name.toUpperCase().indexOf(search.toUpperCase()) > -1 ? (
              <ProductCard
                key={index}
                img={data.img}
                name={data.name}
                price={data.price}
                type={data.type}
                seller={data.seller}
                productId={data.productId}
                quantity={1}
                _id={""}
                _v={0}
                sellerId={data.sellerId}
              />
            ) : categories === "All" &&
              data.name.toUpperCase().includes(search.toUpperCase()) ? (
              <ProductCard
                key={index}
                img={data.img}
                name={data.name}
                price={data.price}
                type={data.type}
                seller={data.seller}
                productId={data.productId}
                quantity={1}
                _id={""}
                _v={0}
                sellerId={data.sellerId}
              />
            ) : (
              ""
            )
          )}
        </div>

        <div className="absolute hidden">
          The item has been added to cart succesfully!!!
        </div>
      </div>
    );
  } else {
    return <div className="absolute hidden"></div>;
  }
};

export default ProductPage;
