import mongoose from "mongoose";
import app from "../../index.js"; // Assuming you have an Express app with the defined route handler for `getPlants`
import request from "supertest";
import Plants from "../models/allPlantsModel";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("should retrieve all plants from the database", async () => {
  // Create sample data to insert into the test database
  const samplePlants = [
    {
      "id": 1,
      "plantName": "Sunflower",
      "flowerColor": "Yellow",
      "foodNutrients": "Pollen, Necter",
      "waterRequirements": "Medium",
      "nativeRegion": "North America",
      "companionPlants": [
          "Marigold",
          "Zinnia"
      ],
      "bloomingTimes": [
          "Summer",
          "Fall"
      ],
      "imageUrl": "https://example.com/sunflower.jpg",
      "plantHeight": {
          "cm": 180,
          "in": 70
      },
      "foodNutrient": "Pollen, Necter"
  },
  {
      "id": 2,
      "plantName": "Lavender",
      "flowerColor": "Purple",
      "foodNutrients": "Nectar",
      "waterRequirements": "Low",
      "nativeRegion": "Mediterranean",
      "companionPlants": [
          "Rosemary",
          "Sage"
      ],
      "bloomingTimes": [
          "Spring",
          "Summer"
      ],
      "imageUrl": "https://example.com/lavender.jpg",
      "plantHeight": {
          "cm": 60,
          "in": 24
      }
  },
  ];

  // Insert sample data into the test database
  await Plants.insertMany(samplePlants);

  // Send a GET request to the route being tested
  const response = await request(app).get("/plants");

  // Assertions
  expect(response.status).toBe(200);
  expect(response.body).toEqual(samplePlants);
});
