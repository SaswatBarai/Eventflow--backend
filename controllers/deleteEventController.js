import imagekit from "../configs/imagekit.js";
import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";

const deleteEventController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (!user.createdEvents.includes(req.params.id)) {
            return res.status(401).json({ message: "You are not authorized to delete this event" });
        }

        const event = await eventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.fileId) {
            await imagekit.deleteFile(event.fileId);
        }

        await eventModel.findByIdAndDelete(req.params.id);

        user.createdEvents.pull(req.params.id);
        await user.save();

        const userWithSavedEvent = await userModel.find({ savedEvents: req.params.id });
        userWithSavedEvent.forEach(async (user)=>{
            user.savedEvents.pull(req.params.id);
            await user.save();
        })

        const userWithRegisteredEvent = await userModel.find({ registeredEvents: req.params.id });  
        userWithRegisteredEvent.forEach(async (user)=>{
            user.registeredEvents.pull(req.params.id);
            await user.save();
        })  
        
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export default deleteEventController;