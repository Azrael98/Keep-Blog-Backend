import express from "express";
import { userPosts, getUserDetails, getComments, allDetails } from "../controllers/users.js";
import {verifyUser} from "../middleware/verifyUser.js"

const router = express.Router();

router.get("/posts", verifyUser ,userPosts);
router.get("/details", verifyUser, getUserDetails)
router.get("/comments", verifyUser, getComments)
router.get("/all", verifyUser, allDetails )

// router.put("/", updateUser);

export default router;
