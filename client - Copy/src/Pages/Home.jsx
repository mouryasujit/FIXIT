import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

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
    <>
      <div className="home">
        <div className="posts">
          {Posts?.map((post) => (
            <div className="post" key={post.id}>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
