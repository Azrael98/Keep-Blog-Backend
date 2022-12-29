import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const register = async (req, res) => {

  const { email, username, password, img } = req.body;
  //CHECK EXISTING USER
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new UserModel({ email, username, img, password: hash });
    const user = await newUser.save();
    res.status(200).json("User Created");

  } catch (error) {
    res.status(500).json(error)
  }

};

export const login = async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
