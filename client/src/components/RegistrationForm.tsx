import React, { useState } from "react";
import { User } from "../types/types";
import { userEndPoint } from "../Apis/index";
import { cartEndPoint } from "../Apis";
import axios, { AxiosError } from "axios";
const registrationEndPoint = `${userEndPoint}/createUser`;
const createcartEndPoint = `${cartEndPoint}/createCart`;
import swal from "sweetalert2";
import { Link } from "react-router-dom";
const RegistrationForm: React.FC = (): JSX.Element => {
  const [passwordcheck, setPasswordCheck] = useState(false);
  const [confirmPasswordcheck, setConfirmPasswordCheck] = useState(false);

  const handlePasswordChange = (e: any) => {
    e.target.checked ? setPasswordCheck(true) : setPasswordCheck(false);
  };
  const handleConfirmPasswordChange = (e: any) => {
    e.target.checked
      ? setConfirmPasswordCheck(true)
      : setConfirmPasswordCheck(false);
  };

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setlastname] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleRegister = (e: any) => {
    e.preventDefault();
    axios.post(createcartEndPoint, {
      username,
    });
    axios
      .post(registrationEndPoint, {
        firstname,
        username,
        lastname,
        email,
        password,
        address,
        confirmPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
        window.location.href = "/";
      })
      .catch((err: AxiosError) => {
        swal.fire({
          html: (err.response?.data as Array<any>)[0]?.errors.issues[0].message,
          showCloseButton: true,
          showConfirmButton: true,
        });
      });
  };
  return (
    <div className="w-full  flex justify-center pt-8 pb-2 mb-12 text-right">
      <form
        onSubmit={handleRegister}
        method="POST"
        className="  p-8  border-2 border-indigo-600 "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex-row sm:flex-col">
            <label htmlFor="firstname">Firstname</label>
            <input
              className="border-2 border-indigo-200 ml-6 mb-4 p-2 mt-2  hover:border-[#065606] "
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              name="firstname"
              required
            />
          </div>
          <div className="flex-row sm:flex-col">
            <label htmlFor="lastname" className="">
              lastname
            </label>
            <input
              className="border-2 border-indigo-200 ml-6 mb-4 p-2 mt-2  hover:border-[#065606] "
              onChange={(e) => setlastname(e.target.value)}
              type="text"
              name="lastname"
              required
            />
          </div>
          <div className="flex-row sm:flex-col">
            <label htmlFor="username">Username</label>
            <input
              className="border-2 border-indigo-200 ml-6 mb-4 p-2 mt-2 hover:border-[#065606] "
              onChange={(e) => setusername(e.target.value)}
              type="text"
              name="username"
            />
          </div>
          <div className="flex-row sm:flex-col ">
            <label htmlFor="password">Password</label>
            <div>
              <input
                className="border-2 border-indigo-200 ml-8 mb-4 mt-2 p-2  hover:border-[#065606]  "
                onChange={(e) => setPassword(e.target.value)}
                type={passwordcheck ? "text" : "password"}
                name="password"
                required
              />

              <input
                className="password-checkbox h-4 w-4 m-2  cursor-pointer"
                onChange={handlePasswordChange}
                type="checkbox"
              ></input>
            </div>
          </div>
          <div className="flex-row sm:flex-col ">
            <label htmlFor="password" className="">
              Confirm Password
            </label>
            <div>
              <input
                className="border-2 border-indigo-200 ml-6 mb-4 mt-2 p-2 ml-2 hover:border-[#065606] "
                onChange={(e) => setconfirmPassword(e.target.value)}
                type={confirmPasswordcheck ? "text" : "password"}
                name="confirmPassword"
                required
              />

              <input
                className="password-checkbox h-4 w-4 m-2 cursor-pointer  "
                onChange={handleConfirmPasswordChange}
                type="checkbox"
              ></input>
            </div>
          </div>

          <div className="flex-row sm:flex-col">
            <label htmlFor="email">Email</label>

            <input
              className="border-2 border-indigo-200 ml-6 mb-4 mt-2 p-2 hover:border-[#065606] "
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
            />
          </div>
          <div className="flex-row sm:flex-col">
            <label htmlFor="address" className="">
              Address
            </label>
            <input
              className="border-2 border-indigo-200 ml-6 mb-4 p-2 mt-2 ml-[2.5rem] hover:border-[#065606]"
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="flex justify-center w-full mt-8 text-xl">
          <input
            className="border cursor-pointer mt-2 mb-4 p-4 bg-indigo-500 hover:bg-gray-400"
            type="submit"
            value="Submit"
          />
        </div>
        <div className="flex justify-center w-full mt-8 text-xl">
          <div className="border cursor-pointer mt-2 mb-4 p-4 hover:bg-indigo-500 bg-gray-400">
            <Link to={"/forgotPassword"}>Forgot Password</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
