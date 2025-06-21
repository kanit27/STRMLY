const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ fullname, email, password: hashedPassword });
    res.status(201).json({ message: "User registered", user: { id: user._id, fullname: user.fullname, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, fullname: user.fullname, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/profile", isLoggedIn, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;