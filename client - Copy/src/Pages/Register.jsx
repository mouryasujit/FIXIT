import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from "axios";

const Register = () => {
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    aadharno: "",
    Dob: "",
    file: "",
    gender: "",
    location: "",
  });

  // console.log(Inputs);

  const [img, setImg] = useState("");
  const [err, setErr] = useState(null);
  const [Urls, SetUrl] = useState("");
  // const [imgPercet, setImgPerc] = useState(0);
  const navigate = useNavigate();
  // const handleChange = async (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", Inputs);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
  };
  const Upload = (e) => {
    setImg(e);
    const storage = getStorage(app);
    // const Date = new Date().getTime();
    const reference = ref(storage, e.name);

    uploadBytes(reference, e)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        console.log(downloadURL);
        SetUrl(downloadURL);
        console.log(Urls);
        setInputs((prev) => ({ ...prev, file: `${downloadURL}` }));
      });
  };
  return (
    <div className="auth flex flex-col   items-center space-y-3 min-h-[85vh] ">
      <h1 className="text-2xl font-bold ">Register</h1>
      <form action="" className="flex flex-col w-4/5 mx-auto space-y-3">
        <input
          type="text"
          required
          placeholder="username"
          name="username"
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, username: e.target.value }));
          }}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <input
          type="text"
          required
          placeholder="password"
          name="password"
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, password: e.target.value }));
          }}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <input
          type="email"
          required
          placeholder="Email"
          name="email"
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, email: e.target.value }));
          }}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <input
          type="text"
          required
          placeholder="Fullname"
          name="fullname"
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, fullname: e.target.value }));
          }}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <input
          type="text"
          required
          placeholder="Aadhar no"
          name="aadharno"
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, aadharno: e.target.value }));
          }}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <input
          type="date"
          required
          placeholder="Date of birth"
          name="Dob"
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, Dob: e.target.value }));
          }}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />

        <input
          type="text"
          required
          placeholder="Location"
          name="location"
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, location: e.target.value }));
          }}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <select
          name="gender"
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, gender: e.target.value }))
          }
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="file"
          required
          placeholder="file"
          name="file"
          onChange={(e) => Upload(e.target.files[0])}
          className="w-[100%] h-12 p-2 text-xl font-medium rounded-md "
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 font-medium text-white text-lg h-12 rounded-md hover:bg-green-600 "
        >
          Register
        </button>
        <h2 className="text-center font-semibold text-white text-2xl">Or</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <p className="mb-5 text-center font-bold text-xl ">
          Don't have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            className="text-red-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
