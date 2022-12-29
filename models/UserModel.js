import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        img: String
    }, { timestamps: true }
)

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;