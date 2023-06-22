//used to create new plant or flower
import { Router } from "express";
import { createPlant } from "../controllers/createPlantController.js";

const router = Router();

router.post("/", createPlant);

export default router;
