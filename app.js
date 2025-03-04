import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/connectDB.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`https://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1); // Stop execution if DB fails to connect
  }
})();
