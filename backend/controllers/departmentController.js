import mongoose from 'mongoose';

import Department from '../models/departmentModel.js';
import { validateDepartment } from '../validation/validateDepartment.js';


export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDepartment = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Department ID' });
  }

  try {
    const department = await Department.findById(req.params.id);
    if (department == null) {
      return res.status(404).json({ message: 'Cannot find department' });
    }
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDepartment = async (req, res) => {
  
  // Validate the fields format and content
  const errors = validateDepartment(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Check if a department with the same name already exists
  const existingDepartment = await Department.findOne({ name: req.body.name });
  if (existingDepartment) {
    return res.status(400).json({ message: 'A department with the same name already exists' });
  }

  const department = new Department({
    name: req.body.name,
    manager: req.body.manager,
    employees: req.body.employees
  });
  
  try {
     // Validate the department before saving
     const validationError = department.validateSync();
     if (validationError) {
       // If there's a validation error, send a 400 Bad Request response
       res.status(400).json({ message: validationError.message });
       return;
     }
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateDepartment = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Department ID' });
  }
    // Validate the fields format and content
    const errors = validateDepartment(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (updatedDepartment == null) {
      return res.status(404).json({ message: 'Cannot find department' });
    }
    res.json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDepartment = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Department ID' });
  }

    try {
      const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
      if (deletedDepartment == null) {
        return res.status(404).json({ message: 'Cannot find department' });
      }
      res.json({ message: 'Deleted department' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };