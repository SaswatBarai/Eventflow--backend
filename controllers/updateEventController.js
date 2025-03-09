import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import imagekit from "../configs/imagekit.js";

const updateEventController = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const event = await eventModel.findById(req.params.id);
        if(!event){
            return res.status(404).json({msg:"Event not found"});
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
        let imageUrl = event.imageUrl;
        let path = event.path;
        let fileId = event.fileId;
        if(req.file){
            const uploadResponse = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
            });
            imageUrl = uploadResponse.url;  
            path = uploadResponse.filePath;
            fileId = uploadResponse.fileId;

        }
        event.title = title;
        event.date = date;
        event.time = time;
        event.location = location;
        event.description = description;
        event.imageUrl = imageUrl;
        event.path = path;
        event.fileId = fileId;
        event.attendees = attendees;
        event.capacity = capacity;
        event.isPublic = isPublic;
        event.status = status;
        await event.save();
        res.status(200).json({msg:"Event updated successfully",event});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Server error"});
        
    }
}
export default updateEventController;