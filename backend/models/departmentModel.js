import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

export default mongoose.model("Department", departmentSchema);
