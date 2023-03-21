import express from "express"
import { addComment, deleteComment, getComments, updateComment } from "../controllers/comments.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.get("/:id", getComments);
router.post("/", verifyUser, addComment);
router.delete("/:id", verifyUser, deleteComment);
router.put("/:id", verifyUser, updateComment);

export default router;