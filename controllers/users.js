import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const getAll = async (req, res) => {
  try {
    const uid = req.user.id;
    const userQuery = "SELECT * from blogs.users WHERE _id = ?";
    const postQuery = "SELECT * from blogs.posts where uid = ?";

    db.query(userQuery, [uid], (err, user) => {
      if (err) return res.status(401).json(err);

      db.query(postQuery, [uid], (err, posts) => {
        if (err) return res.status(401).json(err);

        const { password, ...profile } = user[0];
       

        return res.status(200).json({profile, posts})
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const changePassword = async (req, res) => {
  try {
    const {oldPass, newPass} = req.body;
    const uid = req.user.id
    const userQuery = "SELECT password from blogs.users where _id = ?";
    db.query(userQuery, [uid], async (err, user)=>{
      if(err) return res.status(401).json("User not found")

      const query = "UPDATE blogs.users SET password = ? where _id = ?";
      console.log(user)
      const validity = await bcrypt.compare(oldPass, user[0].password);
      if(!validity) return res.status(401).json("Incorrect Password")

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPass, salt);

      db.query(query, [hash, uid], (err, response)=>{
        if(err) return res.status(401).json(err)

        return res.status(200).json("Password Changed Successfully")
      })
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}
