const express = require('express');
const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all products with filters - implement in controller' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get product by ID - implement in controller' });
});

router.get('/category/:categoryId', (req, res) => {
  res.json({ message: 'Get products by category - implement in controller' });
});

router.get('/search/:query', (req, res) => {
  res.json({ message: 'Search products - implement in controller' });
});

// Admin routes (will add authentication later)
router.post('/', (req, res) => {
  res.json({ message: 'Create product - implement in controller' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update product - implement in controller' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete product - implement in controller' });
});

module.exports = router; 