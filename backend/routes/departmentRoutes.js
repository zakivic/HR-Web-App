import express from 'express';

import * as departmentController from '../controllers/departmentController.js' ;

const router = express.Router();

// Get all departments
router.get('/', departmentController.getAllDepartments);

// Get a single department by ID
router.get('/:id', departmentController.getDepartment);

// Create a new department
router.post('/create-department', departmentController.createDepartment);

// Update an existing department by ID
router.patch('/update-department/:id', departmentController.updateDepartment);

// Delete an existing department by ID
router.delete('/delete-department/:id', departmentController.deleteDepartment);


export default router;