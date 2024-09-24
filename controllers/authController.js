// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Joi = require('joi');

// Validation Schema
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Register User
exports.register = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      return res.redirect('/auth/register');
    }

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'User already exists');
      return res.redirect('/auth/login');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);

    req.flash('success', 'User registered successfully');
    res.redirect('/'); // Redirect to profile after successful registration
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred during registration');
    res.redirect('/auth/register');
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/auth/login');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
    req.flash('success', 'Login successful');
    res.redirect('/'); // Redirect to profile after successful login
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred during login');
    res.redirect('/auth/login');
  }
};

// Logout User
exports.logout = (req, res) => {
  try {
    res.clearCookie('token');
    req.flash('success', 'Logout successful');
    res.redirect('/auth/login'); // Redirect to login after successful logout
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred during logout');
    res.redirect('/');
  }
};
