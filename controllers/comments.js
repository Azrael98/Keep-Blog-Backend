import { db } from "../db.js";
export const addComment = async (req, res) => {
  try {
    const uid = parseInt(req.user.id);
    const { pid, comment, date } = req.body;
    const q =
      "INSERT INTO comments(`comment`, `uid`, `pid`, `date`) VALUES (?)";

    const values = [comment, uid, pid, date];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Comment Added.");
    });
  } catch (error) {
    return res.send(401).json({ msg: "Unauthorized" });
  }
};

export const getComments = async (req, res) => {
  try {
    const qu =
      "SELECT c.id, c.uid, c.comment, c.date, u.username FROM blogs.comments c JOIN blogs.users u ON c.uid=u.id WHERE c.pid=?";
    const values = [req.params.id];
    db.query(qu, values, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  } catch (error) {}
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const q = "DELETE from comments where id = ?";
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
