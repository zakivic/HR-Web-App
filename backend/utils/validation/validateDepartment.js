import mongoose from "mongoose";

export const validateDepartment = (department) => {
  const errors = [];

  // Check if name is provided and is a string
  if (
    department.name &&
    (typeof department.name !== "string" || !department.name.trim())
  ) {
    errors.push({ field: "name", message: "Name is required" });
  }

  // Check if manager is provided and is a valid ObjectId
  if (
    department.manager &&
    !mongoose.Types.ObjectId.isValid(department.manager)
  ) {
    errors.push({ field: "manager", message: "Invalid Manager ID" });
  }

  // Check if employees are provided and are an array of valid ObjectIds
  if (department.employees && department.employees.length > 0) {
    for (const employee of department.employees) {
      if (!mongoose.Types.ObjectId.isValid(employee)) {
        errors.push({ field: "employees", message: "Invalid Employee ID" });
      }
    }
  }

  return errors;
};
