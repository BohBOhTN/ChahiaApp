const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Create a new sale
router.post('/', async (req, res) => {
    try {
        const sale = await Sale.create(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all sales
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a sale by ID
router.get('/:id', async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (sale) {
            res.status(200).json(sale);
        } else {
            res.status(404).json({ error: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a sale by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Sale.update(req.body, {
            where: { sale_id: req.params.id }
        });
        if (updated) {
            const updatedSale = await Sale.findByPk(req.params.id);
            res.status(200).json(updatedSale);
        } else {
            res.status(404).json({ error: 'Sale not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a sale by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Sale.destroy({
            where: { sale_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
