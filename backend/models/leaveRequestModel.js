import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ["Vacation", "Sick", "Personal", "Other"],
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: "Pending",
    enum: ["Pending", "Approved", "Rejected"],
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

export default mongoose.model("Leave", leaveRequestSchema);
