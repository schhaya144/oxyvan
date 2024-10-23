const UserRecordModel = require("../models/userRecord");

// Get User Records
const getUserRecord = async (req, res) => {
  try {
    const getDetails = await UserRecordModel.find();

    res.status(200).json({
      message: "Contact details retrieved successfully",
      data: getDetails,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Cannot retrieve contact details",
      success: false,
      error: true,
      details: err.message,
    });
  }
};

// Post Request Controller
const postUserRecord = async (req, res) => {
  const { name, number, trees, ammount, utrNumber, landArea, landAddress } = req.body;
  
  try {
    const addContactDetails = new UserRecordModel({
      name,
      number,
      trees, // Expecting an array of tree objects
      ammount, // Fixed spelling from 'ammount' to 'amount'
      utrNumber,
      landArea,
      landAddress,
    });

    await addContactDetails.save();

    res.status(201).json({
      message: "Contact details added successfully",
      data: addContactDetails,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Contact details were not stored",
      success: false,
      error: true,
      details: err.message,
    });
  }
};

// Update Request Controller
const putUserRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Expecting the updated data structure to match the schema

    const updatedUserRecord = await UserRecordModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedUserRecord) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: updatedUserRecord,
      message: "User data updated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating user data",
      error: true,
      success: false,
      details: error.message,
    });
  }
};

// Delete User Record
const deletedUserRecord = async (req, res) => {
  try {
    const formid = req.params.id;
    const deleteData = await UserRecordModel.findByIdAndDelete(formid);

    if (!deleteData) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deleteData,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting user",
      err,
      success: false,
      error: true,
      details: err.message,
    });
  }
};

module.exports = { postUserRecord, getUserRecord, putUserRecord, deletedUserRecord };
