const express = require("express");
const data = require("./data.json");

const app = express();

// Endpoint to get all plants/flowers
app.get("/plants", (req, res) => {
  res.json(data);
});

// Endpoint to get a specific plant/flower by ID
app.get("/plants/:id", (req, res) => {
  const id = req.params.id;
  const plant = data.find((p) => p.id === id);
  if (plant) {
    res.json(plant);
  } else {
    res
      .status(404)
      .json({
        message: `No such plant with Id ${id}. Please create one using the link below.`,
      });
  }
  //add a link so that one can add/create a new plant if they don't find what they are looking for
});

// Endpoint to filter plants/flowers by color
app.get("/plants", (req, res) => {
  const color = req.query.flower_color;
  const filteredData = data.filter((p) => p.flower_colors.includes(color));
  res.json(filteredData);
});

// Endpoint to filter plants/flowers by season
app.get("/plants", (req, res) => {
  const season = req.query.season;
  const filteredData = data.filter((p) => p.blooming_times.includes(season));
  res.json(filteredData);
});

// Endpoint to filter plants/flowers by water needs
app.get("/plants", (req, res) => {
  const water = req.query.water;
  const filteredData = data.filter((p) => p.water_needs === water);
  res.json(filteredData);
});

// Endpoint to filter plants/flowers by height range
app.get("/plants", (req, res) => {
  const height = req.query.height;
  const [minHeight, maxHeight] = height.split("-").map((h) => parseInt(h));
  const filteredData = data.filter((p) => {
    const [min, max] = p.plant_height.split("-").map((h) => parseInt(h));
    return min >= minHeight && max <= maxHeight;
  });
  res.json(filteredData);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
