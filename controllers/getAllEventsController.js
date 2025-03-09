import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";

const getAllEventsController = async (req, res) => {
  try {
    const events = await eventModel.find().select('-organizerId -attendees -createdAt -updatedAt -__v').lean();

    if (!req.user) {
      return res.status(200).json({ events });
    }


    // Get the user from the database and populate the registeredEvents and savedEvents fields  of the user
    // The registeredEvents and savedEvents fields contain the events that the user has registered and saved
    const user = await userModel.findById(req.user.id).populate('registeredEvents savedEvents').lean();



    // Get the ids of the events that the user has registered and saved
    // Convert the ids to strings because the ids in the events array are strings
    // This is because the ids in the events array are converted to strings when the events are sent to the client
    /// This is because the ids in the events array are converted to strings when the events are sent to the client
    const registeredEventIds = user.registeredEvents.map(event => event._id.toString());
    const savedEventIds = user.savedEvents.map(event => event._id.toString());



    // Add the isRegistered and isSaved properties to each event
    // These properties indicate whether the user has registered or saved the event
    // The properties are used to display the correct button in the UI
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