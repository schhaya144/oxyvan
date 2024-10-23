const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DonorSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
      unique:true
    },
    donationAmount: {
      type: Number,
      required: true,
      min: 0
    },
    donationType: {
      type: String,
      enum: ['one-time', 'recurring'],
      default: 'one-time'
    },
    paymentMethod: {
      type: String,
      enum: ['online', 'cheque', 'bank'],
      default: 'online'
    },
    paymentFrequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'annually'],
      default: 'monthly'
    },
    cardNumber: {
      type: String,
      required: function() { return this.paymentMethod === 'online'; },
      trim: true
    },
    expiryDate: {
      type: String,
      required: function() { return this.paymentMethod === 'online'; },
      trim: true
    },
    chequeNumber: {
      type: String,
      required: function() { return this.paymentMethod === 'cheque'; },
      trim: true
    },
    bankDetails: {
      type: String,
      required: function() { return this.paymentMethod === 'bank'; },
      trim: true
    },
    donationPurpose: {
      type: String,
      trim: true
    },
    anonymous: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no'
    },
    updates: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no'
    },
    panCard: {
      type: String, // Store file path or URL if you are using file storage service
      required: true
    }
  },
  { timestemp: true }
);

const DonerMOdel= mongoose.model('donorModel', DonorSchema);
module.exports =DonerMOdel
