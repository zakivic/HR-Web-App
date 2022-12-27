import mongoose from "mongoose";

import Training from "../models/trainingModel.js";

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTraining = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Training ID" });
  }

  try {
    const training = await Training.findById(req.params.id);
    if (training == null) {
      return res.status(404).json({ message: "Cannot find training" });
    }
    res.json(training);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTraining = async (req, res) => {
  const training = new Training({
    name: req.body.name,
    instructor: req.body.instructor,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    employees: req.body.employees,
  });

  try {
    const validationError = training.validateSync();
    if (validationError) {
      // If there's a validation error, send a 400 Bad Request response
      res.status(400).json({ message: validationError.message });
      return;
    }
    const newTraining = await training.save();
    res.status(201).json(newTraining);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTraining = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Training ID" });
  }

  try {
    const updatedTraining = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedTraining == null) {
      return res.status(404).json({ message: "Cannot find training" });
    }
    res.json(updatedTraining);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTraining = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Training ID" });
  }

  try {
    const deletedTraining = await Training.findByIdAndDelete(req.params.id);
    if (deletedTraining == null) {
      return res.status(404).json({ message: "Cannot find training" });
    }
    res.json({ message: "Deleted training" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
