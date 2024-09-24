// backend/routes/auth.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Register route
router.post('/register', (req, res) => {
    try {
        register(req, res);
    } catch (error) {
        req.flash('error', 'Registration failed');
        res.redirect('/auth/register');
    }
});

// Login route
router.post('/login', (req, res) => {
    try {
        login(req, res);
    } catch (error) {
        req.flash('error', 'Login failed');
        res.redirect('/auth/login');
    }
});

// Add GET routes
router.get('/register', (req, res) => {
    try {
        res.render('register', { messages: req.flash('error'), successMessages: req.flash('success') });
    } catch (error) {
        req.flash('error', 'Failed to load register page');
        res.redirect('/auth/register');
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login', { messages: req.flash('error'), successMessages: req.flash('success') });
    } catch (error) {
        req.flash('error', 'Failed to load login page');
        res.redirect('/auth/login');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        req.flash('success', 'Logout successful');
        res.redirect('/auth/login'); // Redirect to login after successful logout
    } catch (error) {
        req.flash('error', 'Logout failed');
        res.redirect('/');
    }
});

module.exports = router;