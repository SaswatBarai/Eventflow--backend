import express from "express";
import createEventController from "../controllers/createEventController.js";
import upload from "../configs/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminCheck from "../middlewares/adminCheckMiddleware.js"
import validateEvent from "../utils/validate.event.js"
import getAllEventsController from "../controllers/getAllEventsController.js"

const router = express.Router();

router.post("/create", authMiddleware,adminCheck,validateEvent,upload.single("image"), createEventController);
router.get("/allEvents",authMiddleware.optional,getAllEventsController);


export default router;