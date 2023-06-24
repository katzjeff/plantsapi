import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import authenticateUser from "./utils/middleware/authMiddleware.js";

const port = process.env.PORT || 5000;

import allPlants from "./routes/allPlants.js";
import singlePlant from "./routes/singlePlant.js";
import searchPlants from "./routes/searchPlant.js";
import createPlant from "./routes/createNewPlant.js";
import updatePlant from "./routes/updatePlant.js";
import deletePlant from "./routes/deletePlant.js";
import userRoute from "./routes/userRoute.js"

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Create User
app.use("/users", userRoute)

// Get all plants
app.use("/plants", authenticateUser, allPlants);

// Get a specific plant by ID
app.use("/plants/", authenticateUser, singlePlant);

// Search plants by flower color, water requirements, native region, companion plants, or blooming times
app.use("/plants/", authenticateUser, searchPlants);

// Create a new plant
app.use("/plants/", authenticateUser, createPlant);

//Update an entry
app.use("/plants/", authenticateUser, updatePlant);

//Delete plant or flower
app.use("/plants/", authenticateUser, deletePlant);

// Handle errors for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Start the server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
