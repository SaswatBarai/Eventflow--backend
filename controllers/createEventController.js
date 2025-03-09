import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import imagekit from "../configs/imagekit.js";

const createEventController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      date,
      time,
      location,
      description,
      attendees,
      capacity,
      isPublic,
      status,
    } = req.body;

    let imageUrl = null;
    let path = null;
    let fileId = null;

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer, 
        fileName: req.file.originalname,
      });
      imageUrl = uploadResponse.url;
      path = uploadResponse.filePath;
      fileId = uploadResponse.fileId;
    }

    const newEvent = new eventModel({
      title,
      date,
      time,
      location,
      description,
      imageUrl,
      path,
      fileId,
      organizerId: req.user.id,
      attendees,
      capacity,
      isPublic,
      status,
    });

    const user = await userModel.findById(req.user.id);
    user.createdEvents.push(newEvent._id);
    await user.save();
    await newEvent.save();
    res.status(201).json({ msg: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default createEventController;
