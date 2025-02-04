const express = require('express');
const router = express.Router();
const PaymentHistory = require('../models/PaymentHistory'); // Corrected file path

// Create a new payment history record
router.post('/', async (req, res) => {
    try {
        const paymentHistory = await PaymentHistory.create(req.body);
        res.status(201).json(paymentHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all payment history records
router.get('/', async (req, res) => {
    try {
        const paymentHistories = await PaymentHistory.findAll();
        res.status(200).json(paymentHistories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single payment history record by ID
router.get('/:id', async (req, res) => {
    try {
        const paymentHistory = await PaymentHistory.findByPk(req.params.id);
        if (paymentHistory) {
            res.status(200).json(paymentHistory);
        } else {
            res.status(404).json({ error: 'Payment history not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a payment history record by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await PaymentHistory.update(req.body, {
            where: { payment_history_id: req.params.id }
        });
        if (updated) {
            const updatedPaymentHistory = await PaymentHistory.findByPk(req.params.id);
            res.status(200).json(updatedPaymentHistory);
        } else {
            res.status(404).json({ error: 'Payment history not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a payment history record by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await PaymentHistory.destroy({
            where: { payment_history_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Payment history not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
