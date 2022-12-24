import mongoose from 'mongoose';

export const validatePerformance = (performanceReview) => {
  const errors = [];

  // Check if employee ID is valid
  if (!mongoose.Types.ObjectId.isValid(performanceReview.employee)) {
    errors.push({ field: 'employee', message: 'Invalid Employee ID' });
  }

  // Check if review date is valid
  const validReviewDate = new Date(performanceReview.reviewDate);
  if (!validReviewDate.getTime()) {
    errors.push({ field: 'reviewDate', message: 'Invalid Review Date' });
  }

  // Check if manager ID is valid
  if (!mongoose.Types.ObjectId.isValid(performanceReview.manager)) {
    errors.push({ field: 'manager', message: 'Invalid Manager ID' });
  }

  // Check if strengths, areas for improvement, and goals are provided
  if (!performanceReview.strengths.length || !performanceReview.areasForImprovement.length || !performanceReview.goals.length) {
    errors.push({ field: 'strengths/areasForImprovement/goals', message: 'Strengths, Areas for Improvement, and Goals are required' });
  }

  // Check if overallRating is a number and falls within the valid range
  if (typeof performanceReview.overallRating !== 'number' || performanceReview.overallRating < 1 || performanceReview.overallRating > 5) {
   errors.push({ field: 'overallRating', message: 'Invalid Overall Rating' });
  }

 return errors;
};