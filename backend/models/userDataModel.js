const mongoose = require("mongoose");

// Create Schema
const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Define roles here
      default: "user", // Default role
    },
  },
  { timestamps: true }
);

// Create Model
const userData = mongoose.model("UserData", userDataSchema);

module.exports = userData;
