import validator from 'validator';
import mongoose from 'mongoose';

export const validateTraining = (training) => {
const errors = [];

// Check if name is provided
if (validator.isEmpty(training.name)) {
errors.push({ field: 'name', message: 'Name is required' });
}

// Check if instructor is provided
if (validator.isEmpty(training.instructor)) {
errors.push({ field: 'instructor', message: 'Instructor is required' });
}

// Check if start date and end date are provided and in a valid format
const validStartDate = new Date(training.startDate);
const validEndDate = new Date(training.endDate);
if (isNaN(validStartDate.getTime()) || isNaN(validEndDate.getTime())) {
errors.push({ field: 'startDate/endDate', message: 'Start date and end date must be in a valid format' });
}

// Check if start date is before end date
if (validStartDate > validEndDate) {
errors.push({ field: 'startDate/endDate', message: 'Start date must be before end date' });
}

// Check if location is provided
if (validator.isEmpty(training.location)){
errors.push({ field: 'location', message: 'Location is required' });
}

// Check if employees is an array of valid ObjectIds
if (training.employees && (!Array.isArray(training.employees) || training.employees.some(employee => !mongoose.Types.ObjectId.isValid(employee)))) {
errors.push({ field: 'employees', message: 'Employees must be an array of valid ObjectIds' });
}

return errors;
};