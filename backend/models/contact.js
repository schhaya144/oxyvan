const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name:String,
  numberMobile:Number,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  msg:String
 
}, {
  timestamps: true
});

const ContactModel = mongoose.model("contact", ContactSchema);

module.exports = ContactModel;