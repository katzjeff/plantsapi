// provides an single plant based on plant id
import { Router } from "express";
import { singlePlant } from "../controllers/singlePlantID.js";

const router = Router();

router.get("/:id", singlePlant);

export default router;
