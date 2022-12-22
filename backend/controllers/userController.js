import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Employee from '../models/employeeModel.js';
import nodemailer from 'nodemailer';

export const createUser = async (req, res) => {
  try {
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
  
    // // Send an email to the employee with their password and a link to reset the password
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'your-email@gmail.com',
    //     pass: 'your-password'
    //   }
    // });
  
    // const resetLink = `http://your-app.com/reset-password/${user.resetCode}`;
    // const mailOptions = {
    //   from: 'your-email@gmail.com',
    //   to: employee.email,
    //   subject: 'Your Password and Password Reset Link',
    //   html: `<p>Your password is: ${password}</p><p>If you need to reset your password, click <a href="${resetLink}">here</a>.</p>`
    // };
  
    // transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });

    // Send a success response
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    return res.status(500).json({ error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    // Get the reset code and new password from the request body
    const { resetCode, newPassword } = req.body;

    // Find the user with the specified reset code
    const user = await User.findOne({ resetCode });
    if (!user) {
      return res.status(404).json({ error: `No user found with reset code ${resetCode}` });
    }
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
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
    // Get the updated email, password, and role from the request body
    const { email, password, role } = req.body;

    // Hash the password if it was updated
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the user in the database
    const user = await User.findByIdAndUpdate(req.params.id, {
      email: email,
      password: hashedPassword,
      role: role
    }, { new: true });

    // Send a success response
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
    try {
      // Get the user's email from the request body
      const { email } = req.body;
  
      // Find the user with the specified email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: `User with email ${email} not found` });
      }
  
      // Delete the user from the database
      await user.delete();
  
      // Send a success response
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      // Send an error response if something goes wrong
      return res.status(500).json({ error: error.message });
    }
  };

