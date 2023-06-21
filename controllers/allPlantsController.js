import mongoose from "mongoose";
import fs from "fs"
// import Plants from "../models/allPlantsModel"

export const getPlants = (req, res) => {
  fs.readFile("plants.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read the plants data." });
      return;
    }
    try {
      const plants = JSON.parse(data).plants;
      res.json(plants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to parse the plants data." });
    }
  });
};

// export const postPlants = (req, res, next ) => {
//   res.status(200).json({
//     message: "Plant Created",
//   });
// };
