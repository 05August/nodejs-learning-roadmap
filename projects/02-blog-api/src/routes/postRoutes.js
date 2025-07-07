// src/routes/postRoutes.js
const express = require('express');
const { protect, authorize, checkPostOwnership, optionalAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, (req, res) => {
  res.json({ message: 'Get all posts - implement in controller' });
});

router.get('/:id', optionalAuth, (req, res) => {
  res.json({ message: 'Get post by ID - implement in controller' });
});

router.get('/slug/:slug', optionalAuth, (req, res) => {
  res.json({ message: 'Get post by slug - implement in controller' });
});

// Protected routes
router.post('/', protect, (req, res) => {
  res.json({ message: 'Create post - implement in controller' });
});

router.put('/:id', protect, checkPostOwnership, (req, res) => {
  res.json({ message: 'Update post - implement in controller' });
});

router.delete('/:id', protect, checkPostOwnership, (req, res) => {
  res.json({ message: 'Delete post - implement in controller' });
});

router.post('/:id/like', protect, (req, res) => {
  res.json({ message: 'Like post - implement in controller' });
});

router.post('/:id/comment', protect, (req, res) => {
  res.json({ message: 'Add comment - implement in controller' });
});

module.exports = router; 