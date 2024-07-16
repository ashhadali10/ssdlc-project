// auth.js

const express = require('express');
const router = express.Router();

// Simulated database (replace with MongoDB or other database)
let users = [];

router.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  // Introduce vulnerabilities (e.g., no proper validation, plain text passwords, etc.)
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide username, email, and password' });
  }

  // Simulate vulnerable authentication (replace with proper authentication logic)
  const user = users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user });
});

module.exports = router;
