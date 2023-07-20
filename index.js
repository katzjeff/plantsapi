import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Middleware
import { createdPlants, deletePlants } from "./utils/middleware/rateLimiter.js";

const port = process.env.PORT || 5000;
const MongoDB = process.env.MONGODB_URL;

import allPlants from "./routes/allPlants.js";
import singlePlant from "./routes/singlePlant.js";
import searchPlants from "./routes/searchPlant.js";
import createPlant from "./routes/createNewPlant.js";
import updatePlant from "./routes/updatePlant.js";
import deletePlant from "./routes/deletePlant.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to mongodb
mongoose.connect(MongoDB);

/**Plant Routes */
// Get all plants
app.use("/plants", allPlants);

// Get a specific plant by ID
app.use("/plants/", singlePlant);

// Search plants by flower color, water requirements, native region, companion plants, or blooming times
app.use("/plants/", searchPlants);

// Create a new plant
app.use("/plants/", createdPlants, createPlant);

//Update a plant entry
app.use("/plants/", createdPlants, updatePlant);

//Delete plant or flower
app.use("/plants/", deletePlants, deletePlant);

// Handle errors for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Start the server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
