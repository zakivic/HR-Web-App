import validator from 'validator';
import mongoose from 'mongoose';

const allowedGenders = ['Male', 'Female', 'Other'];
const allowedBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const allowedMartialStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const allowedMilitaryStatuses = ['Active', 'Reserve', 'Veteran', 'None'];
const allowedEducationStatuses = ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'];

export const validateEmployee = employee => {
  const errors = [];

  if (employee.email && !validator.isEmail(employee.email)) {
    errors.push({ field: 'email', message: 'Invalid Email Address' });
  }

  if (employee.mobilePhone && !validator.isMobilePhone(employee.mobilePhone)) {
    errors.push({ field: 'mobilePhone', message: 'Invalid Mobile Phone Number' });
  }

  if (employee.homePhone && !validator.isMobilePhone(employee.homePhone)) {
    errors.push({ field: 'homePhone', message: 'Invalid Emergency Contact Number' });
  }

  if (employee.gender && !allowedGenders.includes(employee.gender)) {
    errors.push({ field: 'gender', message: 'Invalid Gender' });
  }

  if (employee.bloodType && !allowedBloodTypes.includes(employee.bloodType)) {
    errors.push({ field: 'bloodType', message: 'Invalid Blood Type' });
  }

  if (employee.martialStatus && !allowedMartialStatuses.includes(employee.martialStatus)) {
    errors.push({ field: 'martialStatus', message: 'Invalid Martial Status' });
  }

  if (employee.militaryStatus && !allowedMilitaryStatuses.includes(employee.militaryStatus)) {
    errors.push({ field: 'militaryStatus', message: 'Invalid Military Status' });
  }

  if (employee.educationStatus && !allowedEducationStatuses.includes(employee.educationStatus)) {
    errors.push({ field: 'educationStatus', message: 'Invalid Education Status' });
  }

  if (employee.hireDate) {
    const validHireDate = new Date(employee.hireDate);
    if (!validHireDate.getTime()) {
      errors.push({ field: 'hireDate', message: 'Invalid Hire Date' });
    }
  }

  if (employee.department && !mongoose.Types.ObjectId.isValid(employee.department)) {
    errors.push({ field: 'department', message: 'Invalid Department ID' });
  }

  if (employee.photo && validator.isEmpty(employee.photo)) {
    errors.push({ field: 'photo', message: 'Photo is required' });
  }

  return {
    errors
  };
};
