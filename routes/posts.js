import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyUser, addPost);
router.delete("/:id", verifyUser, deletePost);
router.put("/:id", verifyUser, updatePost);

export default router;
