import express from "express";

import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get a single employee by ID
router.get("/:id", employeeController.getEmployee);

// Create a new employee
router.post("/create-employee", employeeController.createEmployee);

// Update an existing employee by ID
router.patch("/update-employee/:id", employeeController.updateEmployee);

// Delete an existing employee by ID
router.delete("/delete-employee/:id", employeeController.deleteEmployee);

export default router;
