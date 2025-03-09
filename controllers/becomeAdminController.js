import userModel from "../models/user.model.js";

const becomeAdminController = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ msg: "You are already an admin" });
    }
    user.role = "admin";
    await user.save();
    res.status(200).json({ msg: "User has been promoted to admin" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default becomeAdminController;
