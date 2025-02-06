const express = require('express');
const router = express.Router();
const CreditPayment = require('../models/CreditPayment'); // Corrected file path

// Create a new credit payment
router.post('/', async (req, res) => {
    try {
        const creditPayment = await CreditPayment.create(req.body);
        res.status(201).json(creditPayment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all credit payments
router.get('/', async (req, res) => {
    try {
        const creditPayments = await CreditPayment.findAll();
        res.status(200).json(creditPayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single credit payment by ID
router.get('/:id', async (req, res) => {
    try {
        const creditPayment = await CreditPayment.findByPk(req.params.id);
        if (creditPayment) {
            res.status(200).json(creditPayment);
        } else {
            res.status(404).json({ error: 'Credit payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a credit payment by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await CreditPayment.update(req.body, {
            where: { credit_id: req.params.id }
        });
        if (updated) {
            const updatedCreditPayment = await CreditPayment.findByPk(req.params.id);
            res.status(200).json(updatedCreditPayment);
        } else {
            res.status(404).json({ error: 'Credit payment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a credit payment by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await CreditPayment.destroy({
            where: { credit_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Credit payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
