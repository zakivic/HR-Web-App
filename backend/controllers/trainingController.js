import Training from '../models/trainingModel.js';

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (training == null) {
      return res.status(404).json({ message: 'Cannot find training' });
    }
    res.json(training);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTraining = async (req, res) => {
  // Check if all required fields are present
  const requiredFields = [
    'name',
    'instructor',
    'startDate',
    'endDate',
    'location',
  ];
  const missingFields = [];

  for (const field of requiredFields) {
    if (!(field in req.body)) {
      missingFields.push(field);
    }
  }

   // If any fields are missing, send a 400 Bad Request response
   if (missingFields.length > 0) {
    res.status(400).json({ message: `Missing ${missingFields.join(', ')} in request body` });
    return;
  }

  const {
    name,
    instructor,
    startDate,
    endDate,
    location,
    employees
  } = req.body;

const validStartDate = new Date(startDate);
const validEndDate = new Date(endDate);

if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
  return res.status(400).json({ message: 'Start date and end date must be in a valid format' });
}

if (startDate > endDate) {
  return res.status(400).json({ message: 'Start date must be before end date' });
}

if (employees && (!Array.isArray(employees) || employees.some(employee => !mongoose.Types.ObjectId.isValid(employee)))) {
  return res.status(400).json({ message: 'Employees must be an array of valid ObjectIds' });
}

  const training = new Training({
    name,
    instructor,
    startDate: validStartDate,
    endDate: validEndDate,
    location,
    employees
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
  try {
    const updatedTraining = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (updatedTraining == null) {
      return res.status(404).json({ message: 'Cannot find training' });
    }
    res.json(updatedTraining);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const deletedTraining = await Training.findByIdAndDelete(req.params.id);
    if (deletedTraining == null) {
      return res.status(404).json({ message: 'Cannot find training' });
    }
    res.json({ message: 'Deleted training' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};