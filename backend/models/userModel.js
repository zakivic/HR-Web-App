import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [
      function (value) {
        return validator.isEmail(value);
      },
      "Invalid Email Address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  resetCode: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: "employee",
    enum: ["admin", "manager", "employee"],
  },
});

export default mongoose.model("User", UserSchema);
