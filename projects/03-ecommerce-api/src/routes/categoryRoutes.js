const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Get categories - implement' }));
router.post('/', (req, res) => res.json({ message: 'Create category - implement' }));

module.exports = router; 