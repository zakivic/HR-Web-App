import mongoose from 'mongoose';

import Performance from '../models/performanceReviewModel.js';

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
    return res.status(400).json({ message: 'Invalid Performance ID' });
  }

  try {
    const performanceReview = await Performance.findById(req.params.id);
    if (performanceReview == null) {
      return res.status(404).json({ message: 'Cannot find performance review' });
    }
    res.json(performanceReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPerformanceReview = async (req, res) => {
  // Check if all required fields are present
  const requiredFields = [
    'employee', 
    'reviewDate', 
    'manager', 
    'strengths', 
    'areasForImprovement', 
    'goals', 
    'overallRating'
  ];
  const missingFields = [];
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      missingFields.push(field);
    }
  }

  // If any fields are missing, send a 400 Bad Request response
  if (missingFields.length > 0) {
    res.status(400).json({ message: `Missing ${missingFields.join(', ')} in request body` });
    return;
  }

  const{
    employee,
    reviewDate,
    manager,
    strengths,
    areasForImprovement,
    goals,
    overallRating
  } = req.body;

    // Check if employee ID is valid
    if (!mongoose.Types.ObjectId.isValid(employee)) {
      return res.status(400).json({ message: 'Invalid Employee ID' });
    }
  
    // Check if review date is valid
    const validReviewDate = new Date(reviewDate);
    if (!validReviewDate.getTime()) {
      return res.status(400).json({ message: 'Invalid Review Date' });
    }
  
    // Check if manager ID is valid
    if (!mongoose.Types.ObjectId.isValid(manager)) {
      return res.status(400).json({ message: 'Invalid Manager ID' });
    }
  
    // Check if strengths, areas for improvement, and goals are provided
    if (!strengths.length || !areasForImprovement.length || !goals.length) {
      return res.status(400).json({ message: 'Strengths, Areas for Improvement, and Goals are required' });
    }

    // Check if overallRating is a number and falls within the valid range
    if (typeof overallRating !== 'number' || overallRating < 1 || overallRating > 5) {
      return res.status(400).json({ message: 'Invalid Overall Rating' });
    }

  const performanceReview = new Performance({
    employee,
    reviewDate,
    manager,
    strengths,
    areasForImprovement,
    goals,
    overallRating
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
  try {
    const updatedPerformanceReview = await Performance.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (updatedPerformanceReview == null) {
      return res.status(404).json({ message: 'Cannot find performance review' });
    }
    res.json(updatedPerformanceReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePerformanceReview = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Performance ID' });
  }

  try {
    const deletedPerformanceReview = await Performance.findByIdAndDelete(req.params.id);
    if (deletedPerformanceReview == null) {
      return res.status(404).json({ message: 'Cannot find performance review' });
    }
      res.json({ message: 'Deleted performance review' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  
  
  