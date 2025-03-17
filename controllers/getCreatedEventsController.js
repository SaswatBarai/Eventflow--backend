import userModel from  "../models/user.model.js";

 const getCreatedEventsController = async (req,res)=>{

    try {
        const user = await userModel.findById(req.user.id).populate("createdEvents");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json(user.createdEvents);    
    } catch (error) {
        return res.status(500).json({message:error.message  });
        
    }
}
export default getCreatedEventsController;