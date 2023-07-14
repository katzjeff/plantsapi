import mongoose from "mongoose";
import Plant from "../models/allPlantsModel.js";

export const createPlant = async (req, res) => {
  try {
    const {
      botanicalName,
      plantName,
      description,
      flowerColor,
      foodNutrients,
      growthHabits,
      waterRequirements,
      nativeRegion,
      companionPlants,
      bloomingTimes,
      imageUrl,
      plantHeight,
    } = req.body;

    // Validate required fields
    if (
      !botanicalName ||
      !plantName ||
      !description ||
      !flowerColor ||
      !foodNutrients ||
      !growthHabits ||
      !waterRequirements ||
      !nativeRegion ||
      !companionPlants ||
      !bloomingTimes ||
      !imageUrl ||
      !plantHeight
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Check for duplicate plant
    const duplicatePlant = await Plant.findOne({
      plantName: { $regex: new RegExp(`^${plantName}$`, "i") },
      flowerColor: { $regex: new RegExp(`^${flowerColor}$`, "i") },
      botanicalName: { $regex: new RegExp(`^${botanicalName}$`, "i") },
      waterRequirements: { $regex: new RegExp(`^${waterRequirements}$`, "i") },
      nativeRegion: { $regex: new RegExp(`^${nativeRegion}$`, "i") },
    });

    if (duplicatePlant) {
      return res.status(409).json({
        error: `${plantName} already exists. Please check or create a new plant/flower.`,
      });
    }

    // Create the new plant
    const newPlant = new Plant({
      _id: new mongoose.Types.ObjectId(),
      botanicalName,
      plantName,
      description,
      flowerColor,
      foodNutrients,
      growthHabits,
      waterRequirements,
      nativeRegion,
      companionPlants,
      bloomingTimes,
      imageUrl,
      plantHeight,
    });

    // Save the new plant to the database
    const savedPlant = await newPlant.save();
    res.status(201).json({
      savedPlant,
      message: `${plantName} ,has been created and saved to the database.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Sorry, an error occurred while creating the new plant.",
    });
  }
};
