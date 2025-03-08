import { body } from "express-validator";

const validateRegister = [
  body("name", "Please enter your name").trim().notEmpty().isLength({ min: 3 }),
  body("email", "Please enter a valid email").trim().isEmail(),
  body("password", "Please enter a password with 6 or more characters").trim().isLength({ min: 6 }),
  body("password").custom((value) => {
    if (!value) {
      throw new Error("Password is empty");
    }
    return true;
  }),
  body("confirmPassword", "Please confirm your password").trim().isLength({ min: 6 }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  })
];

export default validateRegister;
