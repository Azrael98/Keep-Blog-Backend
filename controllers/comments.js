import { db } from "../db.js";
import moment from "moment";
export const addComment = async (req, res) => {
  try {
    const uid = parseInt(req.user.id);
    const { pid, comment } = req.body;
    const q =
      "INSERT INTO comments(`comment`, `uid`, `pid`, `createdAt`, `updatedAt`) VALUES (?)";

    console.log("Getting herer");
    const values = [
      comment,
      uid,
      pid,
      moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment Added.");
    });
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

export const getComments = async (req, res) => {
  try {
    const qu =
      "SELECT c._id, c.uid, c.comment, c.createdAt, c.updatedAt, u.username, u.email, u.img FROM blogs.comments c JOIN blogs.users u ON c.uid=u._id WHERE c.pid=?";
    const values = [req.params.id];
    db.query(qu, values, (err, data) => {
      if (err) return res.status(500).send(err);

      const comment = data.map(item=>{
        const obj = {
            _id:item._id,
            comment:item.comment,
            pid:req.params.id,
            createdAt:item.createdAt,
            updatedAt:item.updatedAt,
            uid:{
              _id:item.uid,
              username:item.username,
              email:item.email
            }
          }
          return obj;
      })
    
      return res.status(200).json(comment);
    });
  } catch (error) {}
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const q = "DELETE from comments where _id = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json("Comment Deleted Successfully");
    });
  } catch (error) {}
};

export const updateComment = async (req, res) => {
  try {
    const { comment, date } = req.body;
    const id = req.params.id;
    const q = "UPDATE comments SET `comment`=?, `date`=? WHERE `id`=?";
    db.query(q, [comment, date, id], (err, data) => {
      if (err) return res.status(401).send(err);

      return res.status(200).json("Comment Edit Successfully");
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
