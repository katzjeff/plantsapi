import util from "util";
import fs from "fs";

const readFileAsync = util.promisify(fs.readFile);

// Helper function to filter plants by color
function filterByColor(plants, color) {
  return plants.filter(
    (p) => p.flowerColor.toLowerCase() === color.toLowerCase()
  );
}

// Helper function to filter plants by water requirements
function filterByWater(plants, water) {
  return plants.filter(
    (p) => p.waterRequirements.toLowerCase() === water.toLowerCase()
  );
}

// Helper function to filter plants by native region
function filterByRegion(plants, region) {
  return plants.filter(
    (p) => p.nativeRegion.toLowerCase() === region.toLowerCase()
  );
}

// Helper function to filter plants by companion plants
function filterByCompanion(plants, companion) {
  return plants.filter((p) => p.companionPlants.includes(companion));
}

// Helper function to filter plants by blooming times
function filterByBlooming(plants, blooming) {
  return plants.filter((p) => p.bloomingTimes.includes(blooming));
}

export const searchPlants = async (req, res) => {
  try {
    const { color, water, region, companion, blooming } = req.query;

    const data = await readFileAsync("plants.json", "utf8");
    const { plants } = JSON.parse(data);
    let filteredPlants = [...plants];

    if (color) {
      filteredPlants = filterByColor(filteredPlants, color);
    }

    if (water) {
      filteredPlants = filterByWater(filteredPlants, water);
    }

    if (region) {
      filteredPlants = filterByRegion(filteredPlants, region);
    }

    if (companion) {
      filteredPlants = filterByCompanion(filteredPlants, companion);
    }

    if (blooming) {
      filteredPlants = filterByBlooming(filteredPlants, blooming);
    }

    res.json(filteredPlants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the plants." });
  }
};
