import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";

const removeAttendeeController = async (req,res)=>{
    try {
        const {idAttendee,eventId}= req.params;
        const event = await eventModel.findById(eventId);
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }   
        const user = await userModel.findById(idAttendee);  
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(event.attendees.includes(idAttendee) && user.registeredEvents.includes(eventId)){
            user.registeredEvents = user.registeredEvents.filter(event=>event!==eventId);
            event.attendees = event.attendees.filter(attendee=>attendee!==idAttendee);
            await event.save();
            await user.save();
            return res.status(200).json({message:"Attendee removed successfully"});
        }   

    } catch (error) {
        
    }
}