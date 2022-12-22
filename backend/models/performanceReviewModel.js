import mongoose from 'mongoose';

const performanceReviewSchema = new mongoose.Schema({
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    reviewDate: {
      type: Date,
      required: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    strengths: [{
      type: String,
      required: true,
      trim: true
    }],
    areasForImprovement: [{
      type: String,
      required: true,
      trim: true
    }],
    goals: [{
      type: String,
      required: true,
      trim: true
    }],
    overallRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  });

  export default mongoose.model('Performance', performanceReviewSchema);