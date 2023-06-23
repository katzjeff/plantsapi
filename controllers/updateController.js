import fs from "fs";

export const updatePlant = (req, res) => {
  const plantId = parseInt(req.params.id);
  const updatedPlant = req.body;

  fs.readFile("plants.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read the plants data." });
    }
    try {
      const plants = JSON.parse(data).plants;
      const plantIndex = plants.findIndex((p) => p.id === plantId);
      if (plantIndex === -1) {
        return res.status(404).json({ error: "Plant not found." });
      }
      plants[plantIndex] = { ...plants[plantIndex], ...updatedPlant };
      const updatedData = { plants };
      fs.writeFile("plants.json", JSON.stringify(updatedData), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to update the plant." });
        }
        res.json({
          message: `Plant with ID ${plantId} has been update successfully.`,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to parse the plants data." });
    }
  });
};
