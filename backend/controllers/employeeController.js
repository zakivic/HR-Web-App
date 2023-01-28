import mongoose from "mongoose";

import Employee from "../models/employeeModel.js";

export const getAllEmployees = async (req, res) => {
  try {
    // Validate the query parameters
    const pageNumber = req.query.page || 1;
    const rowsPerPage = req.query.rowsPerPage || 6;
    if (
      isNaN(pageNumber) ||
      isNaN(rowsPerPage) ||
      pageNumber < 1 ||
      rowsPerPage < 1
    ) {
      return res.status(400).json({ message: "Invalid query parameters" });
    }
    const totalCount = await Employee.countDocuments();

    const employees = await Employee.find()
      .skip((pageNumber - 1) * rowsPerPage)
      .limit(rowsPerPage);
    res.json({ employees, totalCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployee = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Employee ID" });
  }

  try {
    const employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: "Cannot find employee" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEmployee = async (req, res) => {
  // Check if an employee with the same email address already exists
  const existingEmployee = await Employee.findOne({ email: req.body.email });
  if (existingEmployee) {
    return res.status(400).json({
      message: "An employee with the same email address already exists",
    });
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
    emergencyContactPhone: req.body.emergencyContactPhone,
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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Employee ID" });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedEmployee == null) {
      return res.status(404).json({ message: "Cannot find employee" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { ids } = req.body;

  // validate ids array
  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "Invalid ids format, array expected" });
  }

  let deletedCount = 0;
  for (let i = 0; i < ids.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(ids[i])) {
      return res.status(400).json({ message: `Invalid id: ${ids[i]}` });
    }

    // delete employee
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(ids[i]);
      if (deletedEmployee != null) {
        deletedCount++;
      }
    } catch (err) {
      // handle error here, continue deleting the other employees
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id" });
      } else {
        return res.status(500).json({ message: "Error deleting employees" });
      }
    }
  }
  if (deletedCount === 0) {
    // if none of the employees were deleted, return error message
    return res.status(500).json({ message: "Error deleting employees" });
  }
  res.status(200).json({ message: `Deleted ${deletedCount} employees` });
};
