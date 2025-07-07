const express = require('express');
const router = express.Router();

router.post('/create-intent', (req, res) => res.json({ message: 'Create payment intent - implement' }));
router.post('/webhook', (req, res) => res.json({ message: 'Stripe webhook - implement' }));

module.exports = router; 