const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');

// Create a new supplier
router.post('/', async (req, res) => {
    try {
        const { name, contact, credit_terms } = req.body;
        const newSupplier = await Supplier.create({ name, contact, credit_terms });
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single supplier by ID
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (supplier) {
            res.status(200).json(supplier);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a supplier by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, contact, credit_terms } = req.body;
        const [updated] = await Supplier.update({ name, contact, credit_terms }, {
            where: { supplier_id: req.params.id }
        });
        if (updated) {
            const updatedSupplier = await Supplier.findByPk(req.params.id);
            res.status(200).json(updatedSupplier);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a supplier by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Supplier.destroy({
            where: { supplier_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
