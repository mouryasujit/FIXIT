import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";

const Footer = () => {
  return (
    <footer className="mb-6  ">
      <div className="parent flex flex-col items-center p-3 text-white space-y-3">
        <div className="first flex items-center justify-between w-full">
          <h1 className="font-bold text-3xl">Fixit</h1>
          <div className="icons flex items-center w-14 justify-between">
            <SearchIcon />
            <NotificationsNoneIcon />
          </div>
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
