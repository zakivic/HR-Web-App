import mongoose from 'mongoose';
import validator from 'validator';

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [
      function(value) {
        return validator.isEmail(value);
      }, 
      'Invalid Email Address'
    ]
  },
  mobilePhone: {
    type: String,
    required: true,
    trim: true,
    validate: [
      function(value) {
        return validator.isMobilePhone(value);
      },
      'Invalid Mobile Phone Number'
    ]
  },
  homePhone: {
    type: String,
    trim: true,
    validate: [
      function(value) {
        return validator.isMobilePhone(value);
      }, 
      'Invalid Emergency Contact Number'
    ]
  },
  hireDate: {
    type: Date,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  nationalIDNumber: {
    type: String,
    required: true,
    trim: true
  },
  socialSecurityNumber: {
    type: String,
    required: true,
    trim: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ['Male', 'Female', 'Other']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
    trim: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  martialStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ['Single', 'Married', 'Divorced', 'Widowed']
  },
  militaryStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ['Active', 'Reserve', 'Veteran', 'None']
  },
  educationStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate']
  }
});

export default mongoose.model('Employee', employeeSchema);