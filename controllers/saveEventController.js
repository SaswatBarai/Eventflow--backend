import userModel from "../models/user.model.js";
import eventModel from "../models/event.model.js";

const saveEventController = async (req,res)=>{
    try {
        const user = await userModel.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const event = await eventModel.findById(req.params.id);
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }
        if(user.savedEvents.includes(req.params.id)){
            user.savedEvents.pull(req.params.id);
            await user.save();
            return res.status(200).json({message:"Event unsaved successfully"});
        }
        user.savedEvents.push(req.params.id);   
        await user.save();
        return res.status(200).json({message:"Event saved successfully"});


    } catch (error) {
        return res.status(500).json({message:error.message  });
        
    }
}
export default saveEventController;