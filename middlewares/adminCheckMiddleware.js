import userModel from "../models/user.model.js";

const adminCheckMiddleware = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied, admin only" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default adminCheckMiddleware;