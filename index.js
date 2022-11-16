import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/posts", postRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.listen(8000, () => {
  console.log("Connected to Backend PORT 8000");
});
