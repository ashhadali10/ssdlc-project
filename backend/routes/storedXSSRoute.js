const express = require("express");
const router = express.Router();
const StoredXSSData = require("../models/storedXSSDataModel");

// Route to store user input (Vulnerable to Stored XSS)
router.post("/", async (req, res) => {
  const { userInput } = req.body;

  try {
    const storedData = await StoredXSSData.create({ userInput });

    res.status(201).json({ message: "Data stored successfully", storedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store data" });
  }
});

module.exports = router;
