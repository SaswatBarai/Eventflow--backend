import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    imageUrl: String,
    createdEvent: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
    savedEvent: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
    firebaseUID: { 
      type: String, 
      required: true, 
      unique: true 
    },
    avatar: { 
      type: String 
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
