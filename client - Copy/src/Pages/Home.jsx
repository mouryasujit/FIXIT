import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
// import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import { motion } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import Progress from "../Components/Progress";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Home = () => {
  const [Posts, setposts] = useState();
  const [Upvote, Setupvote] = useState(0);
  const [pos, setPos] = useState();
  const cat = useLocation().search;
  const navigate = useNavigate();
  console.log(cat);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`/posts${cat}`);
        console.log(res.data);
        setposts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`/posts${cat}`);
        console.log(res.data);
        setposts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [Upvote]);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleCLick = async (val) => {
    try {
      if (pos != val) {
        const res = await axios.put(`/posts/update/${val}`);
        Setupvote(Upvote + 1);
        setPos(val);
      } else {
        alert("You cannot upvote twice");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="home w-full  ">
      <div className="posts w-full bg-white rounded-t-3xl">
        {Posts?.map((post) => (
          <motion.div
            className="post"
            key={post.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            transition={{ type: "spring", duration: 2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {/* <div className="img">
              <img src={`./upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc).slice(0, 120) + "..."}</p>
              <div className="utility flex items-center justify-between ">
                <button onClick={() => navigate(`/post/${post.id}`)}>
                  Read More
                </button>
                <ArrowCircleUpRoundedIcon />
              </div>
            </div> */}

            <div className="container h-max shadow-md space-y-3   py-3  bg-white cursor-pointer rounded-t-3xl px-3   my-3">
              <div className="profile w-[90%] flex items-center justify-between ">
                <div className="profile-inside flex items-center space-x-2 ">
                  <img
                    // src={`./upload/${post.img}`}
                    src={post.userImg}
                    alt=""
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="info flex flex-col ">
                    <h2 className="font-bold text-lg">{post.username}</h2>
                    <div className="date font-medium text-gray-700">
                      posted {moment(post.date).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="progress h-20 w-20">
                  <Progress />
                </div>
              </div>
              <div className="tags w-full "></div>
              <div className="img-div relative">
                <img
                  src={`./upload/${post.img}`}
                  // src={post.img}
                  alt=""
                  className="w-full h-[300px] rounded-3xl "
                />
                <div className="cat-icons flex items-center justify-between text-white ">
                  <h2 className="border-2 border-white w-max px-2 py-1 rounded-3xl font-bold absolute bottom-10 m-2">
                    {post.cat}
                  </h2>
                  <div className="place space-x-2 flex items-center relative bottom-10 left-[70%] ">
                    <div
                      className="like flex items-center "
                      onClick={() => handleCLick(`${post.id}`)}
                    >
                      <WhatshotRoundedIcon fontSize="large" />{" "}
                      <p>{post.upvotes}</p>
                    </div>
                    <div className="comment flex items-center">
                      <MessageRoundedIcon fontSize="large" />
                      <p>{post.messages}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-main space-y-2 ">
                <h2 className="font-bold text-3xl ">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="info text-gray-500 text-2xl">
                  {getText(post.desc).slice(0, 120) + "..."}
                </p>
              </div>

              <div className="icons space-y-2 flex items-center justify-between">
                <div className="location flex items-center ">
                  <LocationOnOutlinedIcon fontSize="large" />
                  <p className="font-medium text-lg">{post.location}</p>
                </div>
                <div className="socials flex items-center  ">
                  <BookmarkBorderOutlinedIcon fontSize="large" />
                  <MoreVertIcon />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
