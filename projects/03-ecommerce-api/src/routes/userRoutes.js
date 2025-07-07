const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile - implement' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update profile - implement' });
});

module.exports = router; 