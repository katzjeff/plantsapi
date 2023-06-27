import mongoose from "mongoose";
import Plants from "../models/allPlantsModel.js";

export const getPlants = async (req, res) => {
  try {
    const plants = await Plants.find({});
    res.json(plants);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve plant data from the database." });
  }
};
