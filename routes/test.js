import express from "express";
import { handleRequest } from "../controllers/test.js";



const router = express.Router();

router.get("/", handleRequest)
router.post("/", handleRequest)
router.put("/:id", handleRequest)
router.delete("/:id", handleRequest)


export default router;