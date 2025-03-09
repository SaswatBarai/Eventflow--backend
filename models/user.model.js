import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Make password optional for Google Sign-In
    required: false,
  },
  phoneNumber: {
    type: String,
    // Make phoneNumber optional for Google Sign-In
    required: false,
  },
  profilePicture: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
  },
  createdEvents: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  }],
  savedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  }],
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  }],
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },

  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
},{timestamps:true});



const user = mongoose.model('user', userSchema);
export default user;