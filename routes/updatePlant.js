import { Router } from "express";
import { updatePlant } from "../controllers/updateController.js";

const router = Router();

router.put("/:id", updatePlant);

export default router;
