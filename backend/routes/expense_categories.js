const express = require('express');
const router = express.Router();
const ExpenseCategory = require('../models/ExpenseCategory'); // Corrected file path

// Create a new expense category
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new ExpenseCategory({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all expense categories
router.get('/', async (req, res) => {
    try {
        const categories = await ExpenseCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single expense category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await ExpenseCategory.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an expense category by ID
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await ExpenseCategory.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        category.name = name;
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an expense category by ID
router.delete('/:id', async (req, res) => {
    try {
        const category = await ExpenseCategory.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
