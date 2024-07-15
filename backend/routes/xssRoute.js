const express = require("express");
const router = express.Router();

// Reflected XSS endpoint
router.get("/", (req, res) => {
  const { query } = req.query;
  
  // No sanitization of the query parameter, directly reflected in the response
  res.send(`<p>You searched for: ${query}</p>`);
});

module.exports = router;
