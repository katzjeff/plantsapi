import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const port = process.env.PORT || 5000;
// require("dotenv").config();

import allPlants from "./routes/allPlants.js";
import singlePlant from "./routes/singlePlant.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all plants
app.use("/plants", allPlants);

// Get a specific plant by ID
app.use("/plants/", singlePlant);
// app.get("/plants/:id", (req, res) => {
//   const plantId = parseInt(req.params.id);
//   fs.readFile("plants.json", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "Failed to read the plants data." });
//       return;
//     }
//     try {
//       const plants = JSON.parse(data).plants;
//       const plant = plants.find((p) => p.id === plantId);
//       if (!plant) {
//         res.status(404).json({ error: "Plant not found." });
//         return;
//       }
//       res.json(plant);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to parse the plants data." });
//     }
//   });
// });

// Search plants by flower color, water requirements, native region, companion plants, or blooming times
app.get("/plants/search", (req, res) => {
  const { color, water, region, companion, blooming } = req.query;
  fs.readFile("plants.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read the plants data." });
      return;
    }
    try {
      let plants = JSON.parse(data).plants;

      if (color) {
        plants = plants.filter(
          (p) => p.flowerColor.toLowerCase() === color.toLowerCase()
        );
      }
      if (water) {
        plants = plants.filter(
          (p) => p.waterRequirements.toLowerCase() === water.toLowerCase()
        );
      }
      if (region) {
        plants = plants.filter(
          (p) => p.nativeRegion.toLowerCase() === region.toLowerCase()
        );
      }
      if (companion) {
        plants = plants.filter((p) => p.companionPlants.includes(companion));
      }
      if (blooming) {
        plants = plants.filter((p) => p.bloomingTimes.includes(blooming));
      }

      res.json(plants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to parse the plants data." });
    }
  });
});

// Create a new plant
app.post("/plants", (req, res) => {
  const { plant } = req.body;
  if (!plant) {
    res.status(400).json({ error: "Invalid request. Plant data is missing." });
    return;
  }

  fs.readFile("plants.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read the plants data." });
      return;
    }
    try {
      const plants = JSON.parse(data).plants;
      const newPlant = { id: plants.length + 1, ...plant };
      plants.push(newPlant);

      fs.writeFile("plants.json", JSON.stringify({ plants }), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to update the plants data." });
          return;
        }
        res.status(201).json(newPlant);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to parse the plants data." });
    }
  });
});

// Handle errors for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Start the server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
