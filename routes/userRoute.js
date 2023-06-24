// import express from "express";
// import { Router } from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import User from "../models/userModel.js";

// const router = Router();

// // router.post("/signup", (req, res, next) => {
// //   bcrypt.hash(req.body.password, 10, (err, hash) => {
// //     if (err) {
// //       return res.status(500).json({
// //         error: err,
// //       });
// //     } else {
// //       const user = new User({
// //         _id: new mongoose.Types.ObjectId(),
// //         email: req.body.email,
// //         userName: req.body.userName,
// //         password: hash,
// //       });
// //       user
// //         .save()
// //         .then((result) => {
// //           console.log(result);
// //           res.status(201).json({
// //             message: "User has been created successfully.",
// //           });
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //           res.status(500).json({
// //             error: err,
// //           });
// //         });
// //     }
// //   });
// // });

// export default router;

import express from "express";
import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import bcrypt from "bcryptjs";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "user.json");

router.post("/signup", (req, res, next) => {
  const email = req.body.email;

  if (isUserExists(email)) {
    return res.status(409).json({
      message: `Sorry user with email address ${email} already exists.`,
    });
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = {
        email: req.body.email,
        userName: req.body.userName,
        password: hash,
      };
      const usersData = readUsersData();
      console.log(usersData);
      usersData.push(user);
      writeUsersData(usersData);
      res.status(201).json({
        message: "User has been created successfully.",
      });
    }
  });
});

function readUsersData() {
  try {
    const usersData = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(usersData);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}
function writeUsersData(usersData) {
  const data = JSON.stringify(usersData, null, 2);
  fs.writeFileSync(usersFilePath, data);
}

function isUserExists(email) {
  const usersData = readUsersData();
  return usersData.some((user) => user.email === email);
}

export default router;
