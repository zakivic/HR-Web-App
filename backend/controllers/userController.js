import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import Employee from '../models/employeeModel.js';
import { validateUser } from '../utils/validation/validateUser.js';
import { sendResetEmail } from '../utils/sendResetEmail.js';

export const createUser = async (req, res) => {
  try {
    // Validate the request body
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    // Get the email, password, and role from the request body
    const { email, password, role } = req.body;

    // Find the employee with the specified email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ error: `Employee with email ${email} not found` });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user based on the employee's information
    const user = new User({
      employee: employee._id,
      email: employee.email,
      password: hashedPassword,
      role: role
    });

    // Save the new user to the database
    await user.save();

    // Generate a reset code and save it to the user document
    user.resetCode = generateResetCode();
    await user.save();

    // Send an email to the employee with a link to reset the password
    const resetLink = `http://your-app.com/reset-password/${user.resetCode}`;
    await sendResetEmail(employee.email, resetLink);

    // Send a success response
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    return res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
     // Validate the reset code and new password
     const errors = validateUser(req.body);
     if (errors.length > 0) {
       return res.status(400).json({ error: errors });
     }

    // Find the user with the specified reset code
    const user = await User.findOne({ resetCode: req.body.resetCode });
    if (!user) {
      return res.status(404).json({ error: `No user found with reset code ${req.body.resetCode}` });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    // Update the user document with the new password and remove the reset code
    user.password = hashedPassword;
    user.resetCode = undefined;
    await user.save();

    // Send a success response
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Validate the updated email, password, and role
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    // Hash the password if it was updated
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    // Update the user in the database
    const user = await User.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    }, { new: true });

    // Send a success response
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {

    // Validate the request body
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the specified email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: `User with email ${email} not found` });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Generate a JWT and send it in the response
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    // Send an error response if something goes wrong
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    // Find the user with the specified ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: `User with ID ${req.params.id} not found` });
    }

    // Delete the user from the database
    await user.remove();

    // Send a success response
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    return res.status(500).json({ error: error.message });
  }
};



