const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Create a new purchase
router.post('/', async (req, res) => {
    try {
        const { supplier_id, product_id, quantity, unit_cost, payment_method, invoice_number, invoice_photo_url } = req.body;
        const newPurchase = await Purchase.create({
            supplier_id,
            product_id,
            quantity,
            unit_cost,
            payment_method,
            invoice_number,
            invoice_photo_url
        });
        res.status(201).json(newPurchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all purchases
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.findAll();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single purchase by ID
router.get('/:id', async (req, res) => {
    try {
        const purchase = await Purchase.findByPk(req.params.id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a purchase by ID
router.put('/:id', async (req, res) => {
    try {
        const { supplier_id, product_id, quantity, unit_cost, payment_method, invoice_number, invoice_photo_url } = req.body;
        const [updated] = await Purchase.update(
            { supplier_id, product_id, quantity, unit_cost, payment_method, invoice_number, invoice_photo_url },
            { where: { purchase_id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        const updatedPurchase = await Purchase.findByPk(req.params.id);
        res.status(200).json(updatedPurchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a purchase by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Purchase.destroy({ where: { purchase_id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.status(200).json({ message: 'Purchase deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
