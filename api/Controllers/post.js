import { db } from "../db.js";
import Jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT p.id, `username`,`location`,`title`,`desc`,p.img,`upvotes`,`messages`,file AS userImg, `cat` ,`date` FROM users u JOIN posts p ON u.id=p.uid  WHERE cat=?"
    : "SELECT p.id, `username`,`location`,`title`,`desc`,p.img,file AS userImg, `cat` ,`date`,`upvotes`,`messages` FROM users u JOIN posts p ON u.id=p.uid";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`,`title`,`desc`,p.img,file AS userImg, `cat` ,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    console.log(data);
    return res.status(200).json(data[0]);
  });
};

export const addpost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated");
  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token not valid!");

    const q =
      "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?) ";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated");
  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token not valid!");
    const postID = req.params.id;
    const q = "DELETE FROM posts WHERE `id`=? AND `uid`=? ";
    db.query(q, [postID, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your account");
      return res.json("posted deleted succesfully");
    });
  });
};
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated");
  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=? ,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid`=? ";
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.json(err);
      return res.json("Post has been updated");
    });
  });
};

export const updateUpvote = (req, res) => {
  const postId = req.params.id;
  const q = "UPDATE posts SET `upvotes`=`upvotes`+1 where `id`=?";

  db.query(q, [postId], (err, data) => {
    if (err) return res.json(err);
    return res.send(data);
  });
};
