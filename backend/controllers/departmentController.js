import mongoose from "mongoose";

import Department from "../models/departmentModel.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDepartments = async (req, res) => {
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
    const totalCount = await Department.countDocuments();

    const departments = await Department.find()
      .skip((pageNumber - 1) * rowsPerPage)
      .limit(rowsPerPage);

    res.json({ departments, totalCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDepartment = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Department ID" });
  }

  try {
    const department = await Department.findById(req.params.id);
    if (department == null) {
      return res.status(404).json({ message: "Cannot find department" });
    }
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDepartment = async (req, res) => {
  // Check if a department with the same name already exists
  const existingDepartment = await Department.findOne({ name: req.body.name });
  if (existingDepartment) {
    return res
      .status(400)
      .json({ message: "A department with the same name already exists" });
  }

  const department = new Department({
    name: req.body.name,
    manager: req.body.manager,
    employees: req.body.employees,
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
    return res.status(400).json({ message: "Invalid Department ID" });
  }

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedDepartment == null) {
      return res.status(404).json({ message: "Cannot find department" });
    }
    res.json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDepartment = async (req, res) => {
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

    // delete departments
    try {
      const deletedDepartment = await Department.findByIdAndDelete(ids[i]);
      if (deletedDepartment != null) {
        deletedCount++;
      }
    } catch (err) {
      // handle error here, continue deleting the other departments
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id" });
      } else {
        return res.status(500).json({ message: "Error deleting departments" });
      }
    }
  }
  if (deletedCount === 0) {
    // if none of the departments were deleted, return error message
    return res.status(500).json({ message: "Error deleting departments" });
  }
  res.status(200).json({ message: `Deleted ${deletedCount} departments` });
};
