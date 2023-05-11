import bcrypt from "bcryptjs";
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
    return res.status(200).json({ profile: user[0], posts, comments });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const editUser = async (req, res) => {
  try {
    const { username, email } = req.body.userData;
    const user = await UserModel.findByIdAndUpdate(req.user.id, {
      username,
      email,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const changePassword = async (req, res) => {
  try {
    const uid = req.user.id;

    const { oldPass, newPass } = req.body;

    const user = await UserModel.findOne({ _id: uid });

    const validity = await bcrypt.compare(oldPass, user.password);

    if (!validity) return res.status(403).json("Incorrect Password");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPass, salt);

    await UserModel.findByIdAndUpdate({ _id: uid }, { password: hash });
    return res.status(200).json("Password Updated Successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};
