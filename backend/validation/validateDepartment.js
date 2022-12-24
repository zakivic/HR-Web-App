import mongoose from 'mongoose';

export const validateDepartment = department => {
  const errors = [];

  if (typeof department.name !== 'string' || !department.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (department.manager && !mongoose.Types.ObjectId.isValid(department.manager)) {
    errors.push({ field: 'manager', message: 'Invalid Manager ID' });
  }

  if (department.employees && department.employees.length > 0) {
    for (const employee of department.employees) {
      if (!mongoose.Types.ObjectId.isValid(employee)) {
        errors.push({ field: 'employees', message: 'Invalid Employee ID' });
      }
    }
  }

  return errors;
};
