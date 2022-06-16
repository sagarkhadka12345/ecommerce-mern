import React, { useState } from "react";
import { User } from "../types/types";
import { userEndPoint } from "../Apis/index";
import { cartEndPoint } from "../Apis";
import axios, { AxiosError } from "axios";
const registrationEndPoint = `${userEndPoint}/createUser`;
const createcartEndPoint = `${cartEndPoint}/createCart`;
import swal from "sweetalert2";

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
    <div className="w-full h-[90vh] flex justify-center pt-8 pb-2 mb-12 ">
      <form
        onSubmit={handleRegister}
        method="POST"
        className=" registration-form p-8 px-16 pb-4 border-2 border-indigo-600 justify-between  items-center pl-10  "
      >
        <label htmlFor="firstname">Firstname</label>
        <label htmlFor="lastname" className="ml-[14rem]">
          lastname
        </label>
        <br />{" "}
        <input
          className="border-2 border-indigo-200 mb-4 p-2 mt-2  hover:border-[#065606] "
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          name="firstname"
          required
        />
        <input
          className="border-2 border-indigo-200 mb-4 p-2 mt-2 ml-[3rem] hover:border-[#065606] "
          onChange={(e) => setlastname(e.target.value)}
          type="text"
          name="lastname"
          required
        />
        <br />
        <label htmlFor="username">Username</label>
        <br />{" "}
        <input
          className="border-2 border-indigo-200 mb-4 p-2 mt-2 hover:border-[#065606] "
          onChange={(e) => setusername(e.target.value)}
          type="text"
          name="username"
        />
        <br />
        <label htmlFor="password">Password</label>
        <label htmlFor="password" className="ml-[14rem]">
          Confirm Password
        </label>
        <br />
        <input
          className="border-2 border-indigo-200 mb-4 mt-2 p-2 hover:border-[#065606] "
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
        <input
          className="border-2 border-indigo-200 mb-4 mt-2 p-2 ml-2 hover:border-[#065606] "
          onChange={(e) => setconfirmPassword(e.target.value)}
          type={confirmPasswordcheck ? "text" : "password"}
          name="confirmPassword"
          required
        />
        <input
          className="password-checkbox h-4 w-4 m-2 cursor-pointer"
          onChange={handleConfirmPasswordChange}
          type="checkbox"
        ></input>
        <br />
        <label htmlFor="email">Email</label>
        <label htmlFor="address" className="ml-[16rem]">
          Address
        </label>
        <br />{" "}
        <input
          className="border-2 border-indigo-200 mb-4 mt-2 p-2 hover:border-[#065606] "
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          required
        />
        <input
          className="border-2 border-indigo-200 mb-4 p-2 mt-2 ml-[2.5rem] hover:border-[#065606]"
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          name="address"
          required
        />
        <br />
        <div className="flex justify-center w-full mt-8 text-xl">
          <br />{" "}
          <input
            className="border cursor-pointer mt-2 p-4 bg-indigo-500 hover:bg-gray-400"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
