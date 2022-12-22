import Employee from '../models/employeeModel.js';
import validator from 'validator';
import mongoose from 'mongoose';

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEmployee = async (req, res) => {

    // Check if all required fields are present
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'mobilePhone',
      'hireDate',
      'department',
      'jobTitle',
      'nationalIDNumber',
      'socialSecurityNumber',
      'nationality',
      'gender',
      'address',
      'photo',
      'bloodType',
      'martialStatus',
      'militaryStatus',
      'educationStatus'
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

    const {
      firstName,
      lastName,
      email,
      mobilePhone,
      hireDate,
      department,
      jobTitle,
      nationalIDNumber,
      socialSecurityNumber,
      nationality,
      gender,
      address,
      photo,
      bloodType,
      martialStatus,
      militaryStatus,
      educationStatus
    } = req.body;

  // specific validations
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid Email Address' });
  }

  if (!validator.isMobilePhone(mobilePhone)) {
    return res.status(400).json({ message: 'Invalid Mobile Phone Number' });
  }
  // mobile phone of a relative in case of
  const homePhone = req.body.homePhone;
  if (homePhone && !validator.isMobilePhone(homePhone)) {
    return res.status(400).json({ message: 'Invalid Emergency Contact Number' });
  }

  const allowedGenders = ['Male', 'Female', 'Other'];
  if (!allowedGenders.includes(gender)) {
    return res.status(400).json({ message: 'Invalid Gender' });
  }

  const allowedBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  if (!allowedBloodTypes.includes(bloodType)) {
    return res.status(400).json({ message: 'Invalid Blood Type' });
  }

  const allowedMartialStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  if (!allowedMartialStatuses.includes(martialStatus)) {
    return res.status(400).json({ message: 'Invalid Martial Status' });
  }

  const allowedMilitaryStatuses = ['Active', 'Reserve', 'Veteran', 'None'];
  if (!allowedMilitaryStatuses.includes(militaryStatus)) {
    return res.status(400).json({ message: 'Invalid Military Status' });
  }

  const allowedEducationStatuses = ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'];
  if (!allowedEducationStatuses.includes(educationStatus)) {
    return res.status(400).json({ message: 'Invalid Education Status' });
  }

  const validHireDate = new Date(hireDate);
  if (!validHireDate.getTime()) {
    return res.status(400).json({ message: 'Invalid Hire Date' });
  }

  if (!mongoose.Types.ObjectId.isValid(department)) {
    return res.status(400).json({ message: 'Invalid Department ID' });
  }

  if (validator.isEmpty(photo)) {
    return res.status(400).json({ message: 'Photo is required' });
  }


  const employee = new Employee({
    firstName,
    lastName,
    email,
    mobilePhone,
    homePhone: req.body.homePhone,
    hireDate,
    department,
    jobTitle,
    nationalIDNumber,
    socialSecurityNumber,
    nationality,
    gender,
    address,
    photo,
    bloodType,
    martialStatus,
    militaryStatus,
    educationStatus
  });

  try {
    // Validate the employee before saving
    const validationError = employee.validateSync();
    if (validationError) {
      // If there's a validation error, send a 400 Bad Request response
      res.status(400).json({ message: validationError.message });
      return;
    }

    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    // If there's a server error (e.g. database connection issue), send a 500 Internal Server Error response
    res.status(500).json({ message: err.message });
  }
};

export const updateEmployee = async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (updatedEmployee == null) {
        return res.status(404).json({ message: 'Cannot find employee' });
      }
      res.json(updatedEmployee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

export const deleteEmployee = async (req, res) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (deletedEmployee == null) {
        return res.status(404).json({ message: 'Cannot find employee' });
      }
      res.json({ message: 'Deleted Employee' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };