import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // e.g., "14:00"
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    capacity: {
      type: Number,
      default: null,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "published", "canceled"],
      default: "published",
    },
    path: {
      type: String,
      required: [true, "Path is required"],
    },
    fileId: String,

  },
  { timestamps: true }
);

const event = mongoose.model("event", eventSchema);
export default event;
