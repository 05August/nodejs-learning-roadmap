const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get cart - implement in controller' });
});

router.post('/add', (req, res) => {
  res.json({ message: 'Add to cart - implement in controller' });
});

router.put('/update', (req, res) => {
  res.json({ message: 'Update cart item - implement in controller' });
});

router.delete('/remove/:productId', (req, res) => {
  res.json({ message: 'Remove from cart - implement in controller' });
});

router.delete('/clear', (req, res) => {
  res.json({ message: 'Clear cart - implement in controller' });
});

module.exports = router; 