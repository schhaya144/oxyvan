const ContactModel = require("../models/contact");

// Update contact form
const updateContact = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  
      if (!updatedContact) {
        return res.status(404).json({
          message: "Contact not found",
          success: false,
          error: true,
        });
      }
  
      res.status(200).json({
        data: updatedContact,
        message: "Contact data updated successfully",
        success: true,
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update contact data",
        error: true,
        success: false,
      });
    }
  };
  
  // Delete contact
  const deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContact = await ContactModel.findByIdAndDelete(id);
  
      if (!deletedContact) {
        return res.status(404).json({
          message: "Contact not found",
          success: false,
          error: true,
        });
      }
  
      res.status(200).json({
        message: "Contact deleted successfully",
        data: deletedContact,
        success: true,
        error: false,
      });
    } catch (err) {
      console.log("Error:", err);
      res.status(500).json({
        message: "Error deleting contact",
        success: false,
        error: true,
      });
    }
  };
  module.exports={updateContact,deleteContact}