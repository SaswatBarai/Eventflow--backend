import userModel from '../models/user.model.js';

const getSavedEventsController = async ( req,res) =>{
    try {
        const user = await userModel.findById(req.user.id).populate({
            path:"savedEvents",
             select: '-attendees -organizerId -capacity -isPublic -status -path -fileId -createdAt -updatedAt -__v'
        }).lean();  
        if(!user){
            return res.status(400).json({message:"User not found"});
        }       
        return res.json(user.savedEvents);

    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}

export default getSavedEventsController;