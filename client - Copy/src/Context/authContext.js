import { useState, createContext } from "react";
import axios from "axios";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (Inputs) => {
    const res = await axios.post("/auth/login", Inputs);
    setCurrentUser(res.data);
  };
  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };
  useEffect(() => {
    console.log("useeffect");
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
