import mongoose from 'mongoose';

import Employee from '../models/employeeModel.js';
import { validateEmployee } from '../validation/validateEmployee.js'

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployee = async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Employee ID' });
  }

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
 
  // Validate the fields format and content  
  const { isValid, errors } = validateEmployee(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

   // Check if an employee with the same email address already exists
   const existingEmployee = await Employee.findOne({ email: req.body.email });
   if (existingEmployee) {
     return res.status(400).json({ message: 'An employee with the same email address already exists' });
   } 


   const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobilePhone: req.body.mobilePhone,
    homePhone: req.body.homePhone,
    hireDate: new Date(req.body.hireDate),
    department: req.body.department,
    jobTitle: req.body.jobTitle,
    nationalIDNumber: req.body.nationalIDNumber,
    socialSecurityNumber: req.body.socialSecurityNumber,
    nationality: req.body.nationality,
    gender: req.body.gender,
    address: req.body.address,
    photo: req.body.photo,
    bloodType: req.body.bloodType,
    martialStatus: req.body.martialStatus,
    militaryStatus: req.body.militaryStatus,
    educationStatus: req.body.educationStatus,
    emergencyContactName: req.body.emergencyContactName,
    emergencyContactRelationship: req.body.emergencyContactRelationship,
    emergencyContactPhone: req.body.emergencyContactPhone
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
  // Validate the fields format and content
  const { errors } = validateEmployee(req.body);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

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

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Employee ID' });
  }

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