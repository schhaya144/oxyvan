const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['donor', 'volunteer', 'both'], required: true },
  // Additional fields common to both donors and volunteers can go here
});

const UserAll = mongoose.model('User', userSchema);
module.exports=UserAll
