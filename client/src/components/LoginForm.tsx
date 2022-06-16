import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { userEndPoint } from "../Apis";
const loginEnpoint = `${userEndPoint}/login`;
import swal from "sweetalert2";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function loginUser(event: any) {
    event.preventDefault();

    await axios
      .post(loginEnpoint, {
        username,
        password,
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
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <form
        onSubmit={loginUser}
        method="POST"
        className="border-2 border-solid flex flex-col text-indigo-900 p-6 "
      >
        Username:
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          name="username"
          className="p-2 border rounded-md tex-indigo-400 my-4"
          placeholder="username"
        />
        <br />
        Password:
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="pasword"
          className="p-2 border rounded-md tex-indigo-400 my-4"
          placeholder="password"
        />
        <br />
        <button
          type="submit"
          className="w-max rounded-sm p-2 px-4 mt-4 mx-2 border-blue bg-indigo-400 hover:bg-indigo-500 hover:text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
