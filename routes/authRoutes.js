import express from "express";
import { verifyToken, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", verifyToken);
router.post("/register", registerUser);

export default router;
