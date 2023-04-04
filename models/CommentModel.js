import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    uid: { type: mongoose.Types.ObjectId, ref: "UserModel" },
    pid: { type: mongoose.Types.ObjectId, ref: "PostModel" },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("CommentModel", CommentSchema);

export default CommentModel;
