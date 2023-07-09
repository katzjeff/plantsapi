import mongoose from "mongoose";
import Plants from "../models/allPlantsModel.js";

export const searchPlants = async (req, res) => {
  try {
    const query = req.query;

    // Build the search query based on the provided attributes
    const searchQuery = {};
    if (query.flowerColor) searchQuery.flowerColor = query.flowerColor;
    if (query.foodNutrients) searchQuery.foodNutrients = query.foodNutrients;
    if (query.waterRequirements)
      searchQuery.waterRequirements = query.waterRequirements;
    if (query.nativeRegion) searchQuery.nativeRegion = query.nativeRegion;
    if (query.companionPlants)
      searchQuery.companionPlants = query.companionPlants;

    const result = await Plants.find(searchQuery).exec();

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching plants." });
  }
};
