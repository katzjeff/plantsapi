import fs from "fs";

export const createPlant = (req, res) => {
  try {
    const {
      plantName,
      flowerColor,
      foodNutrients,
      waterRequirements,
      nativeRegion,
      companionPlants,
      bloomingTimes,
      imageUrl,
      plantHeight,
    } = req.body;

    // Validate required fields
    if (
      !plantName ||
      !flowerColor ||
      !foodNutrients ||
      !waterRequirements ||
      !nativeRegion ||
      !companionPlants ||
      !bloomingTimes ||
      !imageUrl ||
      !plantHeight
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Generate a unique ID for the new plant
    // const newPlant = {
    //   id: uuidv4(),
    //   plantName,
    //   flowerColor,
    //   foodNutrients: foodNutrients || [],
    //   waterRequirements,
    //   nativeRegion,
    //   companionPlants: companionPlants || [],
    //   bloomingTimes: bloomingTimes || [],
    //   imageUrl,
    //   plantHeight: plantHeight || [],
    // };

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

      //Generate a custom id based on the current db
      const maxId = existingPlants.reduce(
        (max, plant) => (plant.id > max ? plant.id : max),
        0
      );
      const newPlantId = maxId + 1;

      //Create the new plant object
      const newPlant = {
        id: newPlantId,
        plantName,
        flowerColor,
        foodNutrients: foodNutrients || [],
        waterRequirements,
        nativeRegion,
        companionPlants: companionPlants || [],
        bloomingTimes: bloomingTimes || [],
        imageUrl,
        plantHeight: plantHeight || [],
      };

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
};
