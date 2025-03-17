import userModel from "../models/event.model.js";
import eventModel from "../models/user.model.js";

const getAllAttendeesController = async (req,res)=>{
    try {
        const {eventId} = req.query;
        if(!eventId){
            return res.status(400).json({message:"eventId is required"});
        }
        const event =  await eventModel.findById(eventId).populate({
            path:"attendees",
            select:"-password -email -savedEvents -rsvpEvents -createdAt -updatedAt -__v -_id"      
        })
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }
        return res.status(200).json({event:event}); 
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}

export default getAllAttendeesController;   