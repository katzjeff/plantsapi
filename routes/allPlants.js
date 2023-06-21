import { Router } from "express";
import { getPlants } from "../controllers/allPlantsController.js";

const router = Router();

router.get("/", getPlants);

// app.post("/", postPlants);

export default router;
