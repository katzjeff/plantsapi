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

export default router;



