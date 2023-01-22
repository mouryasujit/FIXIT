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
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          type="text"
          required
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          required
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        <h2>Or</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <p>
          Dont have an account?
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
