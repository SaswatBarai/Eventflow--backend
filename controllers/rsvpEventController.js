import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";

const rsvpEventController = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(event.attendees.includes(req.user.id)){
        return res.status(400).json({message:"You have already registered for this event"});    
    }
    else{
        event.attendees.push(req.user.id);
        await event.save();
        user.registeredEvents.push(req.params.id);
        await user.save();
        return res.status(200).json({message:"You have successfully registered for the event"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });   
  }
};

export default rsvpEventController;
