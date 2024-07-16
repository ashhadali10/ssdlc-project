const express = require("express");
const router = express.Router();

// Reflected XSS endpoint
router.get("/", (req, res) => {
  const { query } = req.query;
  res.send(`<p>You searched for: ${query}</p>`);
});

module.exports = router;
