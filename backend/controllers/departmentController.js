import Department from '../models/departmentModel.js';

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDepartment = async (req, res) => {
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
  
  // Validation for name,
  if (!req.body.name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const department = new Department({
    name: req.body.name,
    manager: req.body.manager,
    employees: req.body.employees
  });
  
  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateDepartment = async (req, res) => {
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