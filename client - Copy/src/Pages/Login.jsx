import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

const Login = () => {
  const [Inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(Inputs);
      alert("Login SuccessFull");
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <div className="auth flex flex-col min-h-[85vh] justify-center">
      <h1 className=" text-center font-bold text-2xl mb-3">Login</h1>
      <form action="" className="flex flex-col w-4/5 mx-auto space-y-5">
        <input
          type="text"
          required
          placeholder="username"
          name="username"
          onChange={handleChange}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <input
          type="password"
          required
          placeholder="password"
          name="password"
          onChange={handleChange}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 font-medium text-white text-lg h-12 rounded-md hover:bg-green-600"
        >
          Login
        </button>
        <h2 className="text-center font-semibold text-xl">Or</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <p className="mb-5 text-center font-bold text-lg ">
          Dont have an account?
          <Link
            to="/register"
            style={{ textDecoration: "none" }}
            className="text-red-500"
          >
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
