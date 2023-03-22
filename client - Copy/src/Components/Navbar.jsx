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
      {/* <div
        className={colorChange ? "navbar colorChange w-full" : "navbar w-full"}
      >
        <div className="container w-4/5 mx-auto flex items-center justify-between">
          <div className="logo">
            <Link className="link" to="/">
              <h2>MSR</h2>
            </Link>
          </div>
          <div className="links flex items-center">
            <Link className="link" to="/?cat=art">
              <h6>ART</h6>
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
      </div> */}
    </>
  );
};

export default Navbar;
