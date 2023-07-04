import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import authenticateUser from "../utils/middleware/authMiddleware.js";
import { userLimiter } from "../utils/middleware/rateLimiter.js";

const router = Router();

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    userName: user.userName,
  };

  const options = {
    expiresIn: "1h", // Token expiration time
  };

  // Generate and return the token
  return jwt.sign(payload, process.env.SECRET_KEY, options);
};

//Sign up user
router.post("/signup", userLimiter, async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(409).json({
        error: `User ${userName} is already registered.`,
      });
    }

    // Create a new user
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      userName,
      password: hash,
    });

    const newUser = await user.save();

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({
      message: `User ${userName} has been created successfully.`,
      token: token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

//Sign in a user route
router.post("/signin", userLimiter, async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(404).json({
        error: `User not found.`,
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: `Invalid credentials.`,
      });
    }

    // Generate JWT token
    const token = generateToken(existingUser);

    res.status(200).json({
      message: `User ${existingUser.userName} has been signed in successfully.`,
      token: token,
      user: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Update user details route
router.put(
  "/:userId",
  authenticateUser,
  userLimiter,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { email, userName, password } = req.body;

      // Check if the user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({
          error: `User not found.`,
        });
      }

      // Update user details
      existingUser.email = email || existingUser.email;
      existingUser.userName = userName || existingUser.userName;

      if (password) {
        const hash = await bcrypt.hash(password, 10);
        existingUser.password = hash;
      }

      const updatedUser = await existingUser.save();
      res.status(200).json({
        message: `User ${updatedUser.userName} has been updated successfully.`,
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

// Delete user route
router.delete(
  "/:userId",
  authenticateUser,
  userLimiter,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({
          error: `User not found.`,
        });
      }

      res.status(200).json({
        message: `User ${deletedUser.userName} has been deleted successfully.`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

export default router;
