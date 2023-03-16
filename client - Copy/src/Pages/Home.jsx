import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [Posts, setposts] = useState();
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

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {Posts?.map((post) => (
          <motion.div
            className="post"
            key={post.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", duration: 2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <div className="img">
              <img src={`./upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc).slice(0, 120) + "..."}</p>
              <button onClick={() => navigate(`/post/${post.id}`)}>
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
