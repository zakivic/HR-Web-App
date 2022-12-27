import mongoose from "mongoose";

import Performance from "../models/performanceReviewModel.js";

export const getAllPerformanceReviews = async (req, res) => {
  try {
    const performanceReviews = await Performance.find();
    res.json(performanceReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPerformanceReview = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Performance ID" });
  }

  try {
    const performanceReview = await Performance.findById(req.params.id);
    if (performanceReview == null) {
      return res
        .status(404)
        .json({ message: "Cannot find performance review" });
    }
    res.json(performanceReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPerformanceReview = async (req, res) => {
  const performanceReview = new Performance({
    employee: req.body.employee,
    reviewDate: req.body.reviewDate,
    manager: req.body.manager,
    strengths: req.body.strengths,
    areasForImprovement: req.body.areasForImprovement,
    goals: req.body.goals,
    overallRating: req.body.overallRating,
  });

  try {
    // Validate the performance review before saving
    const validationError = performanceReview.validateSync();
    if (validationError) {
      // If there's a validation error, send a 400 Bad Request response
      res.status(400).json({ message: validationError.message });
      return;
    }

    const newPerformanceReview = await performanceReview.save();
    res.status(201).json(newPerformanceReview);
  } catch (err) {
    // If there's a server error (e.g. database connection issue), send a 500 Internal Server Error response
    res.status(500).json({ message: err.message });
  }
};

export const updatePerformanceReview = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Performance ID" });
  }

  try {
    const updatedPerformanceReview = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedPerformanceReview == null) {
      return res
        .status(404)
        .json({ message: "Cannot find performance review" });
    }
    res.json(updatedPerformanceReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePerformanceReview = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Performance ID" });
  }

  try {
    const deletedPerformanceReview = await Performance.findByIdAndDelete(
      req.params.id
    );
    if (deletedPerformanceReview == null) {
      return res
        .status(404)
        .json({ message: "Cannot find performance review" });
    }
    res.json({ message: "Deleted performance review" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
