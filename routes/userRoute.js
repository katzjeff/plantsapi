import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(409).json({
        error: "User is already registered.",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      userName,
      password: hash,
    });

    const result = await user.save();

    console.log(result);
    res.status(201).json({
      message: "User has been created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Your authorization failed. Please try again.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Your authorization failed. Please try again.",
      });
    }

    res.status(200).json({
      message: "Authentication successful.You are signed in.",
      user: {
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Update user details route
router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, userName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, userName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    res.status(200).json({
      message: "User details updated successfully.",
      user: {
        email: updatedUser.email,
        userName: updatedUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete user route
router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
