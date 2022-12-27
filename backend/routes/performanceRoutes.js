import express from "express";

import * as performanceController from "../controllers/performanceController.js";
import { validatePerformanceRequestBody } from "../middleware/validateReqBodyMiddleware.js";

const router = express.Router();

// Get all performance reviews
router.get("/", performanceController.getAllPerformanceReviews);

// Get a specific performance review by ID
router.get("/:id", performanceController.getPerformanceReview);

// Create a new performance review
router.post(
  "/create-performance",
  validatePerformanceRequestBody,
  performanceController.createPerformanceReview
);

// Update an existing performance review
router.patch(
  "/update-performance/:id",
  validatePerformanceRequestBody,
  performanceController.updatePerformanceReview
);

// Delete an existing performance review
router.delete(
  "/delete-performance/:id",
  performanceController.deletePerformanceReview
);

export default router;
