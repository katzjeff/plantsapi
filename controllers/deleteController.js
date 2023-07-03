import Plant from "../models/allPlantsModel.js";

export const deletePlant = (req, res) => {
  const plantId = req.params.id;

  Plant.findByIdAndDelete(plantId)
    .then((deletedPlant) => {
      if (!deletedPlant) {
        return res.status(404).json({ error: `Sorry, plant not found.` });
      }

      const plantName = deletedPlant.plantName;
      res.json({
        message: `Plant ${plantName} has been deleted successfully.`,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to delete the plant." });
    });
};
