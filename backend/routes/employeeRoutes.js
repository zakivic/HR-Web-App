import express from "express";

import * as employeeController from "../controllers/employeeController.js";
import { validateEmployeeRequestBody } from "../middleware/validateReqBodyMiddleware.js";

const router = express.Router();

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get a single employee by ID
router.get("/:id", employeeController.getEmployee);

// Create a new employee
router.post(
  "/create-employee",
  validateEmployeeRequestBody,
  employeeController.createEmployee
);

// Update an existing employee by ID
router.patch(
  "/update-employee/:id",
  validateEmployeeRequestBody,
  employeeController.updateEmployee
);

// Delete existing employees by ID
router.delete("/delete-employees", employeeController.deleteEmployee);

export default router;
