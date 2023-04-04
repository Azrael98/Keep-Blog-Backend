import CommentModel from "../models/CommentModel.js";
import UserModel from "../models/UserModel.js";

export const getComment = async (req, res) => {
  try {
    CommentModel.find({ pid: req.params.id })
      .populate({ path: "uid", select: "-password" })
      .exec((err, comments) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        res.send(comments);
      });
  } catch (error) {}
};

export const addComment = async (req, res) => {
  try {
    const { comment, pid } = req.body;
    const uid = req.user.id;
    const addComment = new CommentModel({ comment, uid, pid });
    await addComment.save();
    res.status(200).json("Comment Added");
  } catch (error) {}
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = req.user.id;
    let getComment = await CommentModel.findById(id);
    if (!getComment) return res.status(404).json("Comment not found");
    if (getComment.uid.toString() !== uid) {
      return res.status(403).json("You can delete only your comment");
    }

    getComment = await CommentModel.findByIdAndDelete(id);
    res.status(200).json("Comment Delete Successfully");
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const uid = req.user.id;
  try {
    const comm = await CommentModel.findById(commentId);
    if (comm.uid.toString() !== uid)
      return res.status(403).json("You can only update your comments");
    const { comment } = req.body;
    await CommentModel.findByIdAndUpdate(commentId, {
      comment,
    });
    res.status(200).json("Comment updted successfully");
  } catch (error) {
    res.status(500), json(error);
  }
};
