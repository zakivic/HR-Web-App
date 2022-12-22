import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    instructor: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    }]
  });

  export default mongoose.model('Training', trainingSchema);