import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";

const getOneEventController = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id)
            .select('-organizerId -attendees -createdAt -updatedAt -__v')
            .lean();
            
        if (!event) {
            return res.status(404).json({ msg: "Event not found" });
        }
        
        // Check if request has authenticated user
        if (req.user) {
            const user = await userModel.findById(req.user.id);
            if (user) {
                const isRegistered = user.registeredEvents.some(
                    eventId => eventId.toString() === event._id.toString()
                );
                const isSaved = user.savedEvents.some(
                    eventId => eventId.toString() === event._id.toString()
                );
                
                return res.status(200).json({ 
                    event, 
                    isRegistered, 
                    isSaved
                });
            }
        }
        
        // If no authenticated user or user not found
        res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

export default getOneEventController;