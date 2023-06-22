import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

import allPlants from "./routes/allPlants.js";
import singlePlant from "./routes/singlePlant.js";
import searchPlants from "./routes/searchPlant.js";
import createPlant from "./routes/createNewPlant.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all plants
app.use("/plants", allPlants);

// Get a specific plant by ID
app.use("/plants/", singlePlant);

// Search plants by flower color, water requirements, native region, companion plants, or blooming times
app.use("/plants/", searchPlants);

// Create a new plant
app.use("/plants/", createPlant);

// Handle errors for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Start the server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
