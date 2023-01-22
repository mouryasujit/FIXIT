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
      <div className="add">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => settitle(e.target.value)}
            value={title}
          />
          <div className="editorContainer">
            <ReactQUill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h2>Publish</h2>
            <span>
              Status: <b>Draft</b>
            </span>
            <span>
              Visiblity: <b>Public</b>
            </span>
            <input
              type="file"
              style={{ display: "none" }}
              name=""
              id="file"
              onChange={(e) => setfile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <div className="buttons">
              <button>Save as a draft</button>
              <button onClick={handleSubmit}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h2>Category</h2>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "tech"}
                name="cat"
                value="tech"
                id="technology"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "cinema"}
                name="cat"
                value="cinema"
                id="cinema"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="food">Food</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "design"}
                name="cat"
                value="design"
                id="design"
                onChange={(e) => setcat(e.target.value)}
              />
              <label htmlFor="design">Design</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
