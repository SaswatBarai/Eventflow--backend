import {body} from 'express-validator';


const validateEvent = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("date").trim().notEmpty().withMessage("Date is required"),
    body("time").trim().notEmpty().withMessage("Time is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),
]

export default validateEvent;