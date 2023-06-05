import { db } from "../db.js";
import moment from "moment";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p._id, u.username, p.uid, u.email, p.title, p.desc, p.img, p.cat,p.createdAt, p.updatedAt FROM blogs.users u JOIN blogs.posts p ON u._id=p.uid WHERE p._id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `createdAt`, `updatedAt`, `uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    req.user.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
};

export const deletePost = (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE `_id` = ? AND `uid` = ?";

  db.query(q, [postId, req.user.id], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
};

export const updatePost = (req, res) => {
  console.log("getting here");
  try {
    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=?, `updatedAt` = ? WHERE `_id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(
      q,
      [
        ...values,
        moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        postId,
        req.user.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      }
    );
  } catch (error) {
    return res.status(500).json(err);
  }
};
