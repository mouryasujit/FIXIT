import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const Footer = () => {
  const [open, Setopen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <footer className="mb-6  ">
      <div className="parent flex flex-col items-center p-3 text-white space-y-3">
        <div className="first flex items-center justify-between w-full ">
          <h1 className="font-bold text-3xl">Fixit</h1>
          <div className="icons flex items-center w-36 justify-between relative">
            <SearchIcon />
            <NotificationsNoneIcon />
            {currentUser && (
              <div className="user flex flex-col items-center w-8 h-8 shadow-md rounded-full">
                <img
                  src={currentUser.file}
                  alt="userimg"
                  className="w-7 h-7 rounded-full"
                />
              </div>
            )}
            <div className="menu" onClick={() => Setopen(!open)}>
              <MenuIcon fontSize="large" />
            </div>
          </div>
          {open && (
            <ul className="ul list-none absolute top-12 right-0 bg-blue-500 h-full z-40 w-[80%] shadow-xl flex flex-col  items-left text-2xl font-medium p-5 space-y-5 rounded-md ">
              {currentUser && (
                <div className="user flex flex-col items-center">
                  <li>
                    <img
                      src={currentUser.file}
                      alt=""
                      className="w-24 h-24 rounded-full"
                    />
                  </li>
                  <h2 className="text-black font-bold">
                    {currentUser.username}
                  </h2>
                </div>
              )}
              <li>
                {" "}
                <Link
                  to="/"
                  className="hover:text-black"
                  onClick={() => Setopen(false)}
                >
                  Home
                </Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/write" onClick={() => Setopen(false)}>
                  Create an Issue
                </Link>{" "}
              </li>
              {currentUser ? (
                ""
              ) : (
                <li>
                  {" "}
                  <Link to="/register" onClick={() => Setopen(false)}>
                    Register
                  </Link>{" "}
                </li>
              )}
              {currentUser ? (
                ""
              ) : (
                <li>
                  {" "}
                  <Link to="/login" onClick={() => Setopen(false)}>
                    Login
                  </Link>{" "}
                </li>
              )}
              {currentUser ? (
                <li onClick={logout}>
                  {" "}
                  <Link to="" onClick={() => Setopen(false)}>
                    Logout
                  </Link>{" "}
                </li>
              ) : (
                ""
              )}
            </ul>
          )}
        </div>
        <div className="list flex items-center list-none w-full overflow-scroll space-x-3 no-underline  ">
          <li className="px-2 py-1 border-2 border-white rounded-3xl text-sm">
            Roads
          </li>
          <li className="px-2 py-1 border-2 border-white rounded-3xl text-sm">
            Garbage
          </li>
          <li className="px-2 py-1 border-2 border-white rounded-3xl text-sm">
            Infrastructure
          </li>
          <li className="px-2 py-1 border-2 border-white rounded-3xl text-sm">
            Enviornment
          </li>
          <li className="px-2 py-1 border-2 border-white rounded-3xl text-sm">
            Others
          </li>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
