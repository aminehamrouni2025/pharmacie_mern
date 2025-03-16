const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["client", "pharmacist", "admin"],
      default: "client",
    },
    isValidated: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: "https://robohash.org/default-user.png",
    },
    address: {
      type: String,
      default: "your current address"
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
