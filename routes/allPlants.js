//provides a list of all the plants in the db
import { Router } from "express";

const router = Router();

app.get("/plants", (req, res) => {
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
  });
});

export default router;
