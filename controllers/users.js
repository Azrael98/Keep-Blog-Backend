// // import { db } from "../db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import UserModel from "../models/UserModel.js";

// export const getUser = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");
//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Not Aunthenticated");

//     const q = "SELECT * from users WHERE `id` = ?";
//     const userId = userInfo.id;

//     db.query(q, [userId], (err, data) => {
//       if (err) return res.status(403).json(err);

//       console.log(data[0]);

//       return res.status(200).json(data[0]);
//     });
//   });
// };

// export const updateUser = (req, res) => {
//   console.log("Method Called")
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const query = "SELECT * from users WHERE `username`=? OR `email`=?";

//     const userId = userInfo.id;
    

//     db.query(query, [req.body.username, req.body.email], (err, data) => {
//       if (err) return res.status(403).json(err);

//       if (data.length) return res.status(500).json("User already exists");
//       console.log(userInfo.id);

//       // Hash the password and create a user
//       const salt = bcrypt.genSaltSync(10);
//       const hash = bcrypt.hashSync(req.body.password, salt);
//       const q =
//         "UPDATE users SET `username`=?,`email`=?,`password`=? WHERE `id` = ?";

//       const values = [req.body.username, req.body.email, hash, userId];

//       db.query(q, [...values], (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.json("user has been updated.");
//       });
//     });
//   });
// };
