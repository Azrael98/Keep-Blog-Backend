// // import { db } from "../db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import CommentModel from "../models/CommentModel.js";

export const userPosts = async (req, res) => {
  try {
    const uid = req.user.id;
    const posts = await PostModel.find({ uid });
    if (posts.length < 1)
      return res.status(404).json("You have not posted anything yet.");
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const uid = req.user.id;
    const user = await UserModel.find({ _id: uid }).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getComments = async (req, res) => {
  try {
    const uid = req.user.id;
    const comments = await CommentModel.find({ uid });
    if (comments.length < 1)
      return res.status(404).json("You have not commented on any posts yet.");
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allDetails = async (req, res) => {
  try {
    const uid = req.user.id;
    const user = await UserModel.find({ _id: uid }).select("-password");
    const posts = await PostModel.find({ uid });
    const comments = await CommentModel.find({ uid });
    return res.status(200).json({profile:user[0],posts, comments})
    
  } catch (error) {
    return res.status(500).json(error)
  }
};
