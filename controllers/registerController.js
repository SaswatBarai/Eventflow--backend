import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ msg: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default registerController;
