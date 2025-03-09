import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import becomeAdminController from  "../controllers/becomeAdminController.js";

const router = express.Router();

router.post("",authMiddleware,becomeAdminController);

export default router;