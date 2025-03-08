import { body } from "express-validator";

const validLogin = [
  body("email", "Please enter a valid email").trim().notEmpty().isEmail(),
  body("password", "Password is required").trim().notEmpty()
];

export default validLogin;