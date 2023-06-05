import express from "express";
import { register, login, logout, checkUser } from "../controllers/auth.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/register", register);
router.get("/check",verifyUser, checkUser)
router.post("/login", login);
router.post("/logout", logout);

export default router;
