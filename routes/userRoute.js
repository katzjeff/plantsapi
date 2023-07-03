import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(409).json({
        error: `User ${userName} is already registered.`,
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
      message: `User ${userName} has been created successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

//Sign in user
router.post("/signin", async (req, res, next) => {
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

    res.status(200).json({
      message: `User ${existingUser.userName} has been signed in successfully.`,
      user: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// router.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         message: "Your authorization failed. Please try again.",
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         message: "Your authorization failed. Please try again.",
//       });
//     }
//     const token = jwt.sign(
//       {
//         email: user.email,
//         userId: user._id,
//       },
//       process.env.JWT_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );
//     res.status(200).json({
//       message: "Authentication successful.You are signed in.",
//       token: token,
//       user: {
//         email: user.email,
//         userName: user.userName,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// Update user details route
router.put("/:userId", async (req, res, next) => {
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
});

// Delete user route
router.delete("/:userId", async (req, res, next) => {
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
});

export default router;
