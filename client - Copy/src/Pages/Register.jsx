import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", Inputs);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
      <form action="">
        <input
          type="text"
          required
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          required
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          required
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        <h2>Or</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <p>
          Dont have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
