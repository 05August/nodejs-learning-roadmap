const express = require('express');
const router = express.Router();

// Public routes
router.post('/register', (req, res) => {
  res.json({ message: 'User registration - implement in controller' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'User login - implement in controller' });
});

router.post('/forgot-password', (req, res) => {
  res.json({ message: 'Forgot password - implement in controller' });
});

router.post('/reset-password', (req, res) => {
  res.json({ message: 'Reset password - implement in controller' });
});

// Protected routes will be added later
router.get('/me', (req, res) => {
  res.json({ message: 'Get user profile - implement in controller' });
});

module.exports = router; 