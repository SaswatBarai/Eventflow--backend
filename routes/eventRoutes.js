import express from "express";
import createEventController from "../controllers/createEventController.js";
import upload from "../configs/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminCheck from "../middlewares/adminCheckMiddleware.js";
import validateEvent from "../utils/validate.event.js";
import getAllEventsController from "../controllers/getAllEventsController.js";
import updateEventController from "../controllers/updateEventController.js";
import getOneEventController from "../controllers/getOneEventController.js";
import deleteEventController from "../controllers/deleteEventController.js";
import getCreatedEventsController from "../controllers/getCreatedEventsController.js"
import saveEventController  from "../controllers/saveEventController.js"
import getSavedEventsController from "../controllers/getSavedEventsController.js"
import  rsvpEventController from "../controllers/rsvpEventController.js"
import getRsvpEventsController from "../controllers/getRsvpEventsController.js"
import getAllAttendeesController from "../controllers/getAllAttendeesController.js"

const router = express.Router();

router.post("/create", authMiddleware, adminCheck, validateEvent, upload.single("image"), createEventController);
router.get("/allEvents", authMiddleware.optional, getAllEventsController);

// One-on-one event
router.post("/update/:id", authMiddleware, adminCheck, validateEvent, upload.single("image"), updateEventController);
router.get("/oneEvent/:id", authMiddleware.optional, getOneEventController);
router.delete("/delete/:id", authMiddleware, adminCheck, deleteEventController);
router.get("/createdEvents",authMiddleware,adminCheck,getCreatedEventsController);


//SavedEvents 
router.post("/save/:id", authMiddleware, saveEventController);
router.get("/savedEvents", authMiddleware, getSavedEventsController);


router.post("/rsvp/:id", authMiddleware, rsvpEventController);
router.get("/rsvpEvents", authMiddleware, getRsvpEventsController);


//This route is for the admin to get all attendees of an event
router.get("/rsvp/attendees/eventId", authMiddleware,adminCheck,getAllAttendeesController);




export default router;