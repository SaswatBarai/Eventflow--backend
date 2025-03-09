import express from "express";
import createEventController from "../controllers/createEventController.js";
import upload from "../configs/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminCheck from "../middlewares/adminCheckMiddleware.js"
import validateEvent from "../utils/validate.event.js"
import getAllEventsController from "../controllers/getAllEventsController.js"
import updateEventController from "../controllers/updateEventController.js"
import getOneEventController from "../controllers/getOneEventController.js"

const router = express.Router();

router.post("/create", authMiddleware,adminCheck,validateEvent,upload.single("image"), createEventController);
router.get("/allEvents",authMiddleware.optional,getAllEventsController);

//one o one event
router.post("update/:id",authMiddleware,adminCheck,validateEvent,upload.single("image"),updateEventController);
router.get("/oneEvent/:id",authMiddleware.optional,getOneEventController);


export default router;