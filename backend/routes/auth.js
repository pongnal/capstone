const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Endpoint to register
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ email: req.body.email, password: hashed });
  res.status(201).json({ message: "User registered" });
});
//no logic that detect if the user is already registered



// Endpoint to login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign({ _id: user._id, email: user.email }, "w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn", { expiresIn: "1h" });
  res.json({ token });
});


// Endpoint to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, password: 1, _id: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;