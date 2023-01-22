import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.scss";

const Menu = ({ cat }) => {
  console.log(cat);
  const [Posts, setposts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        console.log(res.data);
        setposts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h2>Other post You may Like</h2>
      {Posts ? (
        Posts?.map((post) => (
          <div className="post" key={post.id}>
            <img src={`../upload/${post.img}`} alt="" />
            <h2 className="title">{post.title}</h2>
            <button>Read More</button>
          </div>
        ))
      ) : (
        <p>No data for this category</p>
      )}
    </div>
  );
};

export default Menu;
