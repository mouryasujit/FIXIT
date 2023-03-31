import React from "react";
import { useState } from "react";
import ReactQUill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || "");
  const [title, settitle] = useState(state?.title || "");
  const [file, setfile] = useState(null);
  const [cat, setcat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagUrl = await upload();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imagUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imagUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      alert("upload Succesfull");
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add flex items-center   flex-col p-3 bg-blue-400 space-y-3 min-h-[85vh] ">
        <div className="content mb-2">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => settitle(e.target.value)}
            value={title}
            className="w-full h-14 my-2 p-2 rounded-md font-bold "
          />
          <div className="editorContainer w-full min-h-[300px] my-3">
            <ReactQUill
              className="editor h-[300px] w-full text-sembold text-md overflow-scroll bg-white rounded-md "
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="menu w-full m-4 p-3 flex items-left flex-col">
          <div className="item flex flex-col mb-3 ">
            <h2 className="text-xl mb-2 font-bold ">Category</h2>
            <div className="cat text-xl font-medium  space-x-2">
              <input
                type="radio"
                checked={cat === "garbage"}
                name="cat"
                value="garbage"
                id="garbage"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="garbage">Garbage</label>
            </div>
            <div className="cat text-xl font-medium  space-x-2">
              <input
                type="radio"
                checked={cat === "roads"}
                name="cat"
                value="roads"
                id="roads"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="roads">Roads</label>
            </div>
            <div className="cat text-xl font-medium  space-x-2">
              <input
                type="radio"
                checked={cat === "infrastructure"}
                name="cat"
                value="infrastructure"
                id="infrastructure"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="infrastructure">Infrastructure</label>
            </div>
            <div className="cat text-xl font-medium  space-x-2">
              <input
                type="radio"
                checked={cat === "enviornment"}
                name="cat"
                value="enviornment"
                id="enviornment"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="enviornment">Enviornment</label>
            </div>
            <div className="cat text-xl font-medium  space-x-2">
              <input
                type="radio"
                checked={cat === "others"}
                name="cat"
                value="others"
                id="others"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="others">Others</label>
            </div>
          </div>
          <div className="item flex justify-between items-center">
            <input
              type="file"
              style={{ display: "none" }}
              name=""
              id="file"
              onChange={(e) => setfile(e.target.files[0])}
            />
            <label
              className="file bg-yellow-500 rounded-md p-2 font-bold text-xl"
              htmlFor="file"
            >
              Upload Image
            </label>
            <div className="buttons">
              {/* <button>Save as a draft</button> */}
              <button
                onClick={handleSubmit}
                className="bg-green-700 rounded-md p-2 text-white font-bold text-xl"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
