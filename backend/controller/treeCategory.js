
const volunteerModel = require("../models/volunteer");
const donerschema = require("../models/donor"); // Import the donor schema correctly

// Get all users (donors and volunteers)
const getUsers = async (req, res) => {
  try {
    const donors = await donerschema.find();
    const volunteers = await volunteerModel.find();
    
    res.status(200).json({
      donors,
      volunteers,
      message: "Fetched all users successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: true,
    });
  }
};

// Add a new user (donor or volunteer)
const addUser = async (req, res) => {
  try {
    const { type, ...userData } = req.body; // Expecting 'type' to differentiate between donor and volunteer

    let newUser;
    if (type === 'donor') {
      newUser = new donerschema(userData); // Correct model reference
    } else if (type === 'volunteer') {
      newUser = new volunteerModel(userData); // Correct model reference
    } else {
      return res.status(400).json({ message: "Invalid user type", success: false });
    }

    await newUser.save();
    res.status(201).json({
      data: newUser,
      message: "User added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding user",
      error: true,
    });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, ...updatedData } = req.body;

    let updatedUser;
    if (type === 'donor') {
      updatedUser = await donerschema.findByIdAndUpdate(id, updatedData, { new: true }); // Correct model reference
    } else if (type === 'volunteer') {
      updatedUser = await volunteerModel.findByIdAndUpdate(id, updatedData, { new: true }); // Correct model reference
    } else {
      return res.status(400).json({ message: "Invalid user type", success: false });
    }

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: true,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const donor = await donerschema.findByIdAndDelete(id); // Correct model reference
    if (donor) {
      return res.status(200).json({
        message: "Donor deleted successfully",
        success: true,
      });
    }

    const volunteer = await volunteerModel.findByIdAndDelete(id); // Correct model reference
    if (volunteer) {
      return res.status(200).json({
        message: "Volunteer deleted successfully",
        success: true,
      });
    }

    res.status(404).json({
      message: "User not found",
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: true,
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
