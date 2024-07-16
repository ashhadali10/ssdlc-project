// storedXSSDataModel.js

const mongoose = require("mongoose");

const storedXSSDataSchema = new mongoose.Schema({
  userInput: { type: String, required: true }
});

const StoredXSSData = mongoose.model("StoredXSSData", storedXSSDataSchema);

module.exports = StoredXSSData;
