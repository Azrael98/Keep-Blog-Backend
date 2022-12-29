import { json } from "express";
import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";

export const getPosts = async (req, res) => {

  try {
    const query = req.query.cat;
    const posts = req.query.cat ? await PostModel.find({ cat: query }) : await PostModel.find();
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {

  try {
    const id = req.params.id

    const data = await PostModel.findById(id);
    const userId = data.uid;
    let userdata = await UserModel.findById(userId).select("-password")
    const post = data._doc;
    const { _id, ...user } = userdata._doc;

    res.status(200).json({ ...post, ...user })
  } catch (error) {
    res.status(500).json("yaha pe hai")
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, desc, img, cat } = req.body;
    const uid = req.user.id
    const post = new PostModel({ title, desc, img, uid, cat });
    const result = await post.save();
    res.status(200).json("Post Uploaded")

  } catch (error) {
    res.status(500).json(error)
  }

};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = req.user.id;
    let getPost = await PostModel.findById(id)
    if (!getPost)
      return res.status(404).json("Post not found");
    if (getPost.uid.toString() !== uid) {
      return res.status(403).json("You can delete only your post");
    }

    getPost = await PostModel.findByIdAndDelete(id);
    res.status(200).json("Post Delete Successfully")



  } catch (error) {
    res.status(500).json(error)
  }

};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const uid = req.user.id
  try {
    const post = await PostModel.findById(postId);
    if (post.uid.toString() !== uid) return res.status(403).json("You can only update your posts");
    const { title, desc, img, cat } = req.body;
    const updatePost = await PostModel.findByIdAndUpdate(postId, { title, desc, img, cat });
    res.status(200).json("post updted successfully")
  } catch (error) {
    res.status(500), json(error)
  }


};
