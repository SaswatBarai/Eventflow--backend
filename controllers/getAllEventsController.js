import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";

const getAllEventsController = async (req, res) => {
  try {
    const events = await eventModel.find().lean();

    if (!req.user) {
      return res.status(200).json({ events });
    }
    const user = await userModel.findById(req.user.id).populate('registeredEvents savedEvents').lean();

    const registeredEventIds = user.registeredEvents.map(event => event._id.toString());
    const savedEventIds = user.savedEvents.map(event => event._id.toString());

    const eventsWithStatus = events.map(event => {
      const eventId = event._id.toString();
      return {
        ...event,
        isRegistered: registeredEventIds.includes(eventId),
        isSaved: savedEventIds.includes(eventId),
      };
    });

    res.status(200).json({ events: eventsWithStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default getAllEventsController;