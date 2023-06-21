
import { Router } from "express";
import { getPlants } from "../controllers/allPlantsController.js";

const router = Router();

app.get("/plants", getPlants);

export default router;
