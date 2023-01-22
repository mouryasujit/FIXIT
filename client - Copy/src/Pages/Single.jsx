import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "../Components/Menu";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const Single = () => {
  const [Post, setpost] = useState({});
  const location = useLocation();
  const postID = location.pathname.split("/")[2];
  console.log(postID);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`/posts/${postID}`);

        setpost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postID]);
  const navigate = useNavigate();
  const handleDelete = async () => {
    console.log("indise del");
    try {
      await axios.delete(`/posts/${postID}`);
      alert("post deleted succesfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${Post.img}`} alt="postimg" />
        <div className="user">
          {Post.userImg && <img src={Post.userImg} alt="userimg" />}
          <div className="info">
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {Post.username}
            </span>
            <p>posted {moment(Post.date).fromNow()}</p>
          </div>
          {currentUser?.username === Post?.username && (
            <div className="edit">
              <Link className="link" to={`/write?edit=2`} state={Post}>
                <ModeEditOutlineRoundedIcon className="editp" />
              </Link>
              <DeleteIcon className="delete" onClick={handleDelete} />
            </div>
          )}
        </div>
        <h2>{Post.title}</h2>
        {getText(Post.desc)}
      </div>
      <Menu cat={Post.cat} />
    </div>
  );
};

export default Single;
