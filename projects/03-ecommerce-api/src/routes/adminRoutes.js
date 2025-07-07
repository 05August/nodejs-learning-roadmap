const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => res.json({ message: 'Admin dashboard stats - implement' }));
router.get('/users', (req, res) => res.json({ message: 'Get all users - implement' }));
router.get('/orders', (req, res) => res.json({ message: 'Get all orders - implement' }));

module.exports = router; 