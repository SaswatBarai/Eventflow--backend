import mongoose,{Schema} from "mongoose";

const eventSchema = new Schema({

    title:{
        type:String,
        required:true,
    }

},{timestamps:true})

const event = mongoose.model("event",eventSchema);

export default event;