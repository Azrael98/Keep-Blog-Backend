import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js"
import testRoutes from "./routes/test.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({ credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/comments", commentRoutes)

app.use("/api/test", testRoutes)

app.listen(8000, () => {
  console.log("Connected to Backend PORT 8000");
});
