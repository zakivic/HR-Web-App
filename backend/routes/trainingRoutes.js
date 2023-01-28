import express from "express";

import * as TrainingController from "../controllers/trainingController.js";
import { validateTrainingRequestBody } from "../middleware/validateReqBodyMiddleware.js";

const router = express.Router();

// GET all trainings
router.get("/", TrainingController.getAllTrainings);

// GET a single training by ID
router.get("/:id", TrainingController.getTraining);

// POST a new training
router.post(
  "/create-training",
  validateTrainingRequestBody,
  TrainingController.createTraining
);

// PATCH an existing training
router.patch(
  "/update-training/:id",
  validateTrainingRequestBody,
  TrainingController.updateTraining
);

// DELETE an existing training
router.delete("/delete-trainings", TrainingController.deleteTraining);

export default router;
