const express = require('express');
const router = express.Router();

router.get('/product/:productId', (req, res) => res.json({ message: 'Get product reviews - implement' }));
router.post('/', (req, res) => res.json({ message: 'Create review - implement' }));

module.exports = router; 