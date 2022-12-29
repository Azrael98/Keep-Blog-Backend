import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose,{ connect } from "mongoose";
// import connectToMongo from "./db.js";
import dotenv from "dotenv";


dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors({ credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
