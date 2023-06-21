import mongoose from "mongoose"
// import Plants from "../models/allPlantsModel.js"
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
    })
}