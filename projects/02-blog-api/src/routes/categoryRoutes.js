const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all categories - implement in controller' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get category by ID - implement in controller' });
});

router.get('/slug/:slug', (req, res) => {
  res.json({ message: 'Get category by slug - implement in controller' });
});

// Admin only routes
router.post('/', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Create category - implement in controller' });
});

router.put('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Update category - implement in controller' });
});

router.delete('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Delete category - implement in controller' });
});

module.exports = router; 