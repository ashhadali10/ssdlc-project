const express = require("express");
const router = express.Router();

// Blind XSS endpoint
router.get("/", (req, res) => {
  const { query } = req.query;
  res.send(`Hello ${query}`);
});

module.exports = router;
