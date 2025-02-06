const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Corrected file path
const ExpenseCategory = require('../models/ExpenseCategory'); // Corrected file path

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            include: [ExpenseCategory]
        });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single expense by ID
router.get('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id, {
            include: [ExpenseCategory]
        });
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new expense
router.post('/', async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an expense by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Expense.update(req.body, {
            where: { expense_id: req.params.id }
        });
        if (updated) {
            const updatedExpense = await Expense.findByPk(req.params.id);
            res.json(updatedExpense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Expense.destroy({
            where: { expense_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
