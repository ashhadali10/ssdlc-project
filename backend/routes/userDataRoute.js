const express = require("express");
const router = express.Router();
const UserData = require("../models/userDataModel");
const fetch = require("node-fetch");

// SSRF Test endpoint
router.get("/ssrf-test", async (req, res) => {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.status(200).send(encodeHTML(data)); // HTML encode output
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// CREATE - Vulnerable input validation
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "Name, email, and age are required." });
  }

  try {
    const userAdded = await UserData.create({
      name: encodeHTML(name),
      email: encodeHTML(email),
      age: age,
    });

    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await UserData.find();
    const sanitizedUsers = allUsers.map(user => ({
      name: encodeHTML(user.name),
      email: encodeHTML(user.email),
      age: user.age,
    }));

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await UserData.findById(id);

    if (!singleUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const sanitizedUser = {
      name: encodeHTML(singleUser.name),
      email: encodeHTML(singleUser.email),
      age: singleUser.age,
    };

    res.status(200).json(sanitizedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserData.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(201).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE user by ID
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await UserData.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const sanitizedUser = {
      name: encodeHTML(updatedUser.name),
      email: encodeHTML(updatedUser.email),
      age: updatedUser.age,
    };

    res.status(200).json(sanitizedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Excessive Memory Route (for demonstration)
router.get("/api/excessive-memory", async (req, res) => {
  const largeArray = new Array(10e6).fill("data");
  res.json({ message: "Excessive memory example" });
});

module.exports = router;
