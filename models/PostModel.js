import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {

        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        img: String,
        uid: { type: mongoose.Types.ObjectId, ref: "UserModel" },
        cat: String
    }, { timestamps: true }
)

const PostModel = mongoose.model("PostModel", PostSchema);

export default PostModel;