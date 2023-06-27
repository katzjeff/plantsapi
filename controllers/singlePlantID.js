import Plant from "../models/allPlantsModel.js";

export const singlePlant = async (req, res) => {
  try {
    const plantId = req.params.id;

    const plant = await Plant.findOne({ _id: plantId });

    if (!plant) {
      res.status(404).json({
        error: `Sorry, no plant with ID ${plantId} was found. Please try another ID, or create a new plant/flower.`,
      });
      return;
    }

    res.json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the plant." });
  }
};
