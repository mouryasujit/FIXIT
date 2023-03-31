import { db } from "../db.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const Register = (req, res) => {
  //check existing user
  const q = "SELECT * FROM users WHERE email=? OR username=?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO users(`username`,`email`,`password`,`fullname`,`location`,`file`,`aadharno`,`birth`,`gender`)VALUES(?)";
    const values = [
      req.body.username,
      req.body.email,
      hash,
      req.body.fullname,
      req.body.location,
      req.body.file,
      req.body.aadharno,
      req.body.Dob,
      req.body.gender,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data);
    });
  });
};
//Login
export const Login = (req, res) => {
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0)
      return res.status(404).json("User Not Found 😢 please Register ");

    //check password

    const ispasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!ispasswordCorrect)
      return res.status(400).json("wrong username or password");
    const token = Jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...otherdetails } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherdetails);
  });
};
export const Logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("user has been logout");
};
