//used to create new plant or flower

import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const router = Router();

router.post("/", (req, res) => {
  try {
    const {
      plantName,
      flowerColor,
      waterRequirements,
      nativeRegion,
      companionPlants,
      bloomingTimes,
    } = req.body;

    // Validate required fields
    if (!plantName || !flowerColor || !waterRequirements || !nativeRegion) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Generate a unique ID for the new plant
    const newPlant = {
      id: uuidv4(),
      plantName,
      flowerColor,
      waterRequirements,
      nativeRegion,
      companionPlants: companionPlants || [],
      bloomingTimes: bloomingTimes || [],
    };

    // Read existing plants from the file
    fs.readFile("plants.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to read the plants data." });
      }

      // Parse the JSON data
      const existingPlants = JSON.parse(data).plants;

      // Add the new plant to the existing plants
      existingPlants.push(newPlant);

      // Write the updated plants back to the file
      fs.writeFile(
        "plants.json",
        JSON.stringify({ plants: existingPlants }),
        (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Failed to write the new plant data." });
          }

          res.status(201).json(newPlant);
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the new plant." });
  }
});

export default router;
