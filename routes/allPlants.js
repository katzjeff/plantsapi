//provides a list of all the plants in the db
import { Router } from "express";
import { getPlants } from "../controllers/allPlantsController";

const router = Router();

app.get("/plants", getPlants);

export default router;
