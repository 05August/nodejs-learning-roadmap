// src/routes/userRoutes.js
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all users - implement in controller' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get user by ID - implement in controller' });
});

// Admin only routes
router.put('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Update user - implement in controller' });
});

router.delete('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Delete user - implement in controller' });
});

module.exports = router; 