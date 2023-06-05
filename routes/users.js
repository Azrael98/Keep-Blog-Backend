import express from "express";
import { changePassword, getAll } from "../controllers/users.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();
router.get("/all", verifyUser, getAll)
router.put("/changePassword", verifyUser, changePassword)

// router.put("/", updateUser);

export default router;
