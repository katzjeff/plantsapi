import fs from "fs";
import utils from "util";
const readFileAsync = utils.promisify(fs.readFile);

export const singlePlant = async (req, res) => {
  try {
    const plantId = parseInt(req.params.id);
    if (isNaN(plantId)) {
      res.status(400).json({ error: "Invalid plant ID." });
      return;
    }

    const data = await readFileAsync("plants.json", "utf8");
    const plants = JSON.parse(data).plants;
    const plant = plants.find((p) => p.id === plantId);

    if (!plant) {
      res.status(404).json({ error: "Plant not found." });
      return;
    }

    res.json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the plant." });
  }
};