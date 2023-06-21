//route used to search all the plants in the database based on various parameters

import { Router } from "express";
import { searchPlants } from "../controllers/searchPlants.js";

const router = Router();

router.get("/plants/search", searchPlants);

export default router;
