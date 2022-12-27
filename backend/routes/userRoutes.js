import express from "express";

import * as userController from "../controllers/userController.js";
import { validateUserBody } from "../middleware/validateReqBodyMiddleware.js";

const router = express.Router();

// POST a new user
router.post("/create-user", validateUserBody, userController.createUser);

// PATCH an existing user - Reset the temp password
router.put("/reset-password", validateUserBody, userController.resetPassword);

// PATCH an existing user
router.put("/update-user/:id", validateUserBody, userController.updateUser);

export default router;
