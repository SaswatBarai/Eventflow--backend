import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Remove password from user object before sending response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default loginController;