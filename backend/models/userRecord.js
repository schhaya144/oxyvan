const mongoose = require("mongoose");

const UserRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true }, // Changed to String to accommodate phone number formats
  trees: [
    {
      treeType: { type: String }, // Type of tree
      numberOfTrees: { type: Number} // Count of trees for this type
    }
  ],
  ammount: { type: Number }, // Fixed spelling from 'ammount' to 'amount'
  utrNumber: { type: String },
  landArea: { type: Number },
  landAddress: { type: String },
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Model creation
const UserRecordModel = mongoose.model("UserRecord", UserRecordSchema);

module.exports = UserRecordModel;
