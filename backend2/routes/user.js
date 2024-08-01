import express from "express";
import users from "../models/users.js";
import bcrypt from "bcrypt";
import { generatewebtoken, verifyToken } from "../services/authentication.js";
import cors from "cors";

const router = express.Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  verifyToken(token, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Use CORS
router.use(cors());

// User Registration Route
router.post("/register", async (req, res) => {
  // console.log("Register Request:", req.body);
  // console.log("register route hittt");
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new users({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    // Generate token
    const token = generatewebtoken(newUser);

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Registered successfully", token });
  } catch (error) {
    console.error("Error in creating a user:", error);
    res.status(500).json({ message: "Server side error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  // console.log("Login Request:", req.body);
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await users.findOne({ username });
    if (!user) {
      // console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // console.log("Password mismatch");
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = generatewebtoken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server side error", error: error.message });
  }
});


// Fetch User Profile Data
router.get("/:userId", authenticateToken,(req, res, next) => {
  next();
}, authenticateToken, async (req, res) => {
  try {
    const user = await users.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      username: user.username,
      name: user.name,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server side error", error: error.message });
  }
});

// Edit Profile Route
router.post("/editprofile", authenticateToken, async (req, res) => {
  const { userId, username, name, bio, profilePic } = req.body;

  try {
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username !== undefined) user.username = username;
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (profilePic !== undefined) user.profilePic = profilePic;

    await user.save();
    res.status(200).json({ message: "User details updated" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server side error", error: error.message });
  }
});

// Change Password Route
router.post("/changepassword", authenticateToken, async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server side error", error: error.message });
  }
});

// Logout Route
router.post("/logout", authenticateToken, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
