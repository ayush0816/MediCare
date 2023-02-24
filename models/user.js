const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ventilator_cnt: {
    type: Number,
    default: 0,
  },
});
