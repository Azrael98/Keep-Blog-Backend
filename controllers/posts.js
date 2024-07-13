import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getPosts = (req, res) => {
  try {
    const q = req.query.cat
      ? "SELECT * FROM posts WHERE cat=?"
      : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
};

export const getPost = (req, res) => {
  try {
    const q =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM " +
      process.env.DB_NAME +
      ".users u JOIN " +
      process.env.DB_NAME +
      ".posts p ON u.id=p.uid WHERE p.id=?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
};

export const addPost = (req, res) => {
  try {
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      req.user.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
};

export const deletePost = (req, res) => {
  console.log("Delete Post Called");
  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

  db.query(q, [postId, req.user.id], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
};

export const updatePost = (req, res) => {
  const postId = req.params.id;
  const q =
    "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  db.query(q, [...values, postId, req.user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
};
