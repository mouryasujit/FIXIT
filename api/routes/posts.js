import express from "express";
import {
  addpost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  updateUpvote,
} from "../Controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addpost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.put("/update/:id", updateUpvote);

export default router;
