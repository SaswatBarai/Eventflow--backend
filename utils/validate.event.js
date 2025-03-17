import { body } from 'express-validator';

const validateEvent = [
  body("title").trim().isEmpty().withMessage("Title is required"),
  body("description").trim().isEmpty().withMessage("Description is required"),
  body("date").trim().isEmpty().withMessage("Date is required"),
  body("time").trim().isEmpty().withMessage("Time is required"),
  body("location").trim().isEmpty().withMessage("Location is required"),
];

export default validateEvent;