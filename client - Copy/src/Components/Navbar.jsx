import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../Context/authContext";

const Navbar = () => {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <>
      <div className={colorChange ? "navbar colorChange" : "navbar"}>
        <div className="container">
          <div className="logo">
            <Link className="link" to="/">
              <h2>MSR</h2>
            </Link>
          </div>
          <div className="links">
            <Link className="link" to="/?cat=art">
              <h6>ART</h6>
            </Link>
            <Link className="link" to="/?cat=science">
              <h6>SCIENCE</h6>
            </Link>
            <Link className="link" to="/?cat=tech">
              <h6>TECHNOLOGY</h6>
            </Link>
            <Link className="link" to="/?cat=design">
              <h6>DESIGN</h6>
            </Link>
            <Link className="link" to="/?cat=food">
              <h6>FOOD</h6>
            </Link>
            <Link className="link" to="/?cat=cinema">
              <h6>CINEMA</h6>
            </Link>
            <span>{currentUser?.username}</span>
            {currentUser ? (
              <span onClick={logout}>Logout</span>
            ) : (
              <Link className="link" style={{ fontWeight: "bold" }} to="/login">
                Login
              </Link>
            )}
            <Link className="link write" to="/write">
              Write
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
