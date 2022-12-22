import express from 'express';

import * as userController from '../controllers/userController.js';

const router = express.Router();

// POST a new user
router.post('/create-user', userController.createUser);

// PATCH an existing user - Reset the temp password
router.put('/reset-password', userController.resetPassword);

// PATCH an existing user
router.put('/update-user/:id', userController.updateUser);

export default router;
