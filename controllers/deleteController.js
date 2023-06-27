// import fs from "fs";

// export const deletePlant = (req, res) => {
//   const identifier = req.params.id;
//   const searchBy = isNaN(identifier) ? "plantName" : "id";

//   fs.readFile("plants.json", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Failed to read the plants data." });
//     }
//     try {
//       const plants = JSON.parse(data).plants;
//       let plantIndex;

//       if (searchBy === "plantName") {
//         plantIndex = plants.findIndex(
//           (p) => p.plantName.toLowerCase() === identifier.toLowerCase()
//         );
//       } else {
//         plantIndex = plants.findIndex((p) => p.id === parseInt(identifier));
//       }

//       if (plantIndex === -1) {
//         return res.status(404).json({ error: "Plant not found." });
//       }

//       plants.splice(plantIndex, 1);
//       const updatedData = { plants };

//       fs.writeFile("plants.json", JSON.stringify(updatedData), (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ error: "Failed to delete the plant." });
//         }
//         res.json({ message: "Plant deleted successfully." });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to parse the plants data." });
//     }
//   });
// };


import Plant from "../models/allPlantsModel.js"

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
        return res.status(404).json({ error: `Sorry, ${plantName} plant not found.` });
      }
      res.json({ message: ` ${plantName} has been deleted successfully.` });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to delete the plant." });
    });
};
