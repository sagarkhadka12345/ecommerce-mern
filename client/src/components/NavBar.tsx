import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userEndPoint } from "../Apis";

import { Link } from "react-router-dom";
import { User } from "../types/types";

const NavBar: React.FC = (): JSX.Element => {
  const api = `${userEndPoint}/findUser`;
  const [user, setUser] = useState<User>();
  const [screenSize, setScreenSize] = useState<string>("notMobile");
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
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="flex sm:py-7 px-8 py-6 text-indigo-900 bg-gray-100 flex-col sm:flex-row ">
        <div className="flex-1 cursor-pointer my-2  sm:my-0 ml-4 sm:ml-0 p-4 sm:p-2 border-2 border-black w-max sm:border-0">
          <Link to={"/"}> logo</Link>
        </div>
        <div
          className="sm:hidden block ml-auto cursor-pointer absolute top-[2rem] right-[2rem]"
          onClick={() =>
            screenSize === "mobile"
              ? setScreenSize("notMobile")
              : setScreenSize("mobile")
          }
        >
          <div className="w-9 h-1 bg-slate-900 my-1.5 relative duration-200 line1 "></div>
          <div className="w-9 h-1 bg-slate-900 my-1.5 relative duration-200 line2 "></div>
          <div className="w-9 h-1 bg-slate-900 my-1.5 relative duration-200 line3"></div>
        </div>
        <div
          className="flex-auto flex justify-between sm:flex-row flex-col py-4 pl-4"
          id={screenSize}
        >
          <div className="my-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]">
            <Link to={"/"}>Home</Link>
          </div>
          <div className="my-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]">
            <Link to={"/catalogue"}>Catalogue</Link>
          </div>
          {user?.username ? (
            ""
          ) : (
            <div className="my-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]">
              <Link to={"/login"}>login</Link>
            </div>
          )}
          {user?.username ? (
            ""
          ) : (
            <div className="my-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]">
              <Link to={"/register"}>Register</Link>
            </div>
          )}

          <div className="my-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]">
            <Link to={"/carts"}>Cart</Link>
          </div>
          <div className="my-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]">
            <Link to={"/item"}>Create New Ad</Link>
          </div>
          {user?.username && (
            <div className="cmy-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]">
              {" "}
              {user.username}
            </div>
          )}
          {user?.username ? (
            <div
              className="my-2 pl-4 sm:my-0 cursor-pointer hover:text-[#7510F7]s"
              onClick={logout}
            >
              Log Out
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
