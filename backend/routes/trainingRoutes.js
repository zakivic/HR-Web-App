import express from 'express';

import * as TrainingController from '../controllers/trainingController.js';

const router = express.Router();


// GET all trainings
router.get('/', TrainingController.getAllTrainings);

// GET a single training by ID
router.get('/:id', TrainingController.getTraining);

// POST a new training
router.post('/', TrainingController.createTraining);

// PATCH an existing training
router.patch('/:id', TrainingController.updateTraining);

// DELETE an existing training
router.delete('/:id', TrainingController.deleteTraining);

export default router;