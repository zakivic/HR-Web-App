import mongoose from "mongoose";

import Performance from "../models/performanceReviewModel.js";

// export const getAllPerformanceReviews = async (req, res) => {
//   try {
//     const performanceReviews = await Performance.find();
//     res.json(performanceReviews);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getAllPerformanceReviews = async (req, res) => {
  try {
    // Validate the query parameters
    const pageNumber = req.query.page || 1;
    const rowsPerPage = req.query.rowsPerPage || 6;
    if (
      isNaN(pageNumber) ||
      isNaN(rowsPerPage) ||
      pageNumber < 1 ||
      rowsPerPage < 1
    ) {
      return res.status(400).json({ message: "Invalid query parameters" });
    }
    const totalCount = await Performance.countDocuments();

    const performanceReviews = await Performance.find()
      .skip((pageNumber - 1) * rowsPerPage)
      .limit(rowsPerPage);

    res.json({ performanceReviews, totalCount });
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
  const { ids } = req.body;

  // validate ids array
  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "Invalid ids format, array expected" });
  }

  let deletedCount = 0;
  for (let i = 0; i < ids.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(ids[i])) {
      return res.status(400).json({ message: `Invalid id: ${ids[i]}` });
    }

    // delete performances
    try {
      const deletedPerformance = await Performance.findByIdAndDelete(ids[i]);
      if (deletedPerformance != null) {
        deletedCount++;
      }
    } catch (err) {
      // handle error here, continue deleting the other performance
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id" });
      } else {
        return res
          .status(500)
          .json({ message: "Error deleting performance reviews" });
      }
    }
  }
  if (deletedCount === 0) {
    // if none of the performances were deleted, return error message
    return res
      .status(500)
      .json({ message: "Error deleting performance reviews" });
  }
  res
    .status(200)
    .json({ message: `Deleted ${deletedCount} performance reviews` });
};

// export const deletePerformanceReview = async (req, res) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: "Invalid Performance ID" });
//   }

//   try {
//     const deletedPerformanceReview = await Performance.findByIdAndDelete(
//       req.params.id
//     );
//     if (deletedPerformanceReview == null) {
//       return res
//         .status(404)
//         .json({ message: "Cannot find performance review" });
//     }
//     res.json({ message: "Deleted performance review" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
