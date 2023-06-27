import Plant from "../models/allPlantsModel.js";

export const deletePlant = (req, res) => {
  const identifier = req.params.id;
  const searchBy = isNaN(identifier) ? "plantName" : "id";

  let query;
  if (searchBy === "plantName") {
    query = { plantName: identifier };
  } else {
    query = { id: parseInt(identifier) };
  }

  Plant.findOneAndRemove(query)
    .then((deletedPlant) => {
      if (!deletedPlant) {
        return res
          .status(404)
          .json({ error: `Sorry, ${plantName} plant not found.` });
      }
      res.json({ message: ` ${plantName} has been deleted successfully.` });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to delete the plant." });
    });
};
