import { Router } from "express";
import { deletePlant } from "../controllers/deleteController.js";

const router = Router();

router.delete("/:id", deletePlant);

export default router;
