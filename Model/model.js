const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
  },
  userName: {
    type: String,
  },
  createdTime: {
    type: String,
  },
});

module.exports = mongoose.model("data", userSchema);
