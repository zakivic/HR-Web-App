import validator from 'validator';

export const validateUser = (user) => {
  const errors = [];

  // Check if email is provided and in a valid format
  if (user.email) {
    if (validator.isEmpty(user.email)) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!validator.isEmail(user.email)) {
      errors.push({ field: 'email', message: 'Email must be in a valid format' });
    }
  }

  // Check if password is provided
  if (user.password && validator.isEmpty(user.password)) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  // Check if role is provided
  if (user.role) {
    if (validator.isEmpty(user.role)) {
      errors.push({ field: 'role', message: 'Role is required' });
    } else if (!['admin', 'employee'].includes(user.role)) {
        errors.push({ field: 'role', message: 'Invalid role' });
      }
    }
  
    return errors;
  };