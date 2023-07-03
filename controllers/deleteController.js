import Plant from "../models/allPlantsModel.js";

export const deletePlant = (req, res) => {
  const identifier = req.params.id;
  console.log(identifier);
  const searchBy = isNaN(identifier) ? "plantName" : "id";
  console.log(searchBy);

  let query;
  if (searchBy === "plantName") {
    query = { plantName: identifier };
  } else {
    query = { id: parseInt(identifier) };
  }

  console.log(query);

  Plant.findOneAndRemove(query)
    .then((deletedPlant) => {
      if (!deletedPlant) {
        return res.status(404).json({ error: `Sorry, plant not found.` });
      }
      res.json({ message: `Plant has been deleted successfully.` });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to delete the plant." });
    });
};

// export const deletePlant = (req, res) => {
//   const identifier = req.params.id;
//   const plantName = req.params.plantName
//   const searchBy = isNaN(identifier) ? "plantName" : "id";

//   let query;

//   if (searchBy === "id") {
//     query = { id: parseInt(identifier) };
//   } else {
//     query = { plantName: plantName };
//   }

//   Plant.findOneAndDelete(query)
//     .then((deletedPlant) => {
//       if (!deletedPlant) {
//         return res.status(404).json({ error: `Sorry, plant not found.` });
//       }
//       res.json({ message: ` Plant has been deleted successfully.` });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "Failed to delete the plant." });
//     });
// };
