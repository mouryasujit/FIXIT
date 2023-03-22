import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../Style.scss";

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
    <>
      <h2 className="text-2xl font-bold text-blue-500 p-2  ">
        Other post You may Like
      </h2>
      <div className="menu p-2 flex w-full space-x-3 overflow-x-scroll">
        {Posts ? (
          Posts?.map((post) => (
            <div
              className="post w-52 my-3 space-y-2   bg-gray-200 p-2 shadow-lg"
              key={post.id}
            >
              <img
                src={`../upload/${post.img}`}
                // src="/img/img1.jpg"
                alt=""
                className="w-48 h-[150px]"
              />
              <h2 className="title font-bold text-lg">{post.title}</h2>
              <p className="text-red-500 font-bold border-2 border-red-600 w-max rounded-3xl px-2">
                {post.cat}
              </p>
              <Link to={`/post/${post.id}`}>
                <button className="bg-blue-500 text-white w-full text-center p-1 mt-2 ">
                  Read More
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No data for this category</p>
        )}
      </div>
    </>
  );
};

export default Menu;
