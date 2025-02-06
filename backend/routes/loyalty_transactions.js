const express = require('express');
const router = express.Router();
const LoyaltyTransaction = require('../models/LoyaltyTransaction');

// Get all loyalty transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await LoyaltyTransaction.findAll();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new loyalty transaction
router.post('/', async (req, res) => {
    try {
        const transaction = await LoyaltyTransaction.create(req.body);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a loyalty transaction
router.put('/:id', async (req, res) => {
    try {
        const transaction = await LoyaltyTransaction.update(req.body, {
            where: { transaction_id: req.params.id }
        });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a loyalty transaction
router.delete('/:id', async (req, res) => {
    try {
        await LoyaltyTransaction.destroy({
            where: { transaction_id: req.params.id }
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
