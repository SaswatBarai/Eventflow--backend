import express from 'express';
import validReg from "../utils/validate.reg.js";
import validLogin from "../utils/validate.login.js";
import loginController from "../controllers/loginController.js";    
import registerController from "../controllers/registerController.js";
 

const router = express.Router();

router.post("/register",validReg,registerController);
router.post ("/login",validLogin,loginController);


export default router;