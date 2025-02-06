const express = require('express');
const router = express.Router();
const LoyaltyProgram = require('../models/LoyaltyProgram');

// Get all loyalty programs
router.get('/', async (req, res) => {
    try {
        const programs = await LoyaltyProgram.findAll();
        res.json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new loyalty program
router.post('/', async (req, res) => {
    try {
        const program = await LoyaltyProgram.create(req.body);
        res.status(201).json(program);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a loyalty program
router.put('/:id', async (req, res) => {
    try {
        const program = await LoyaltyProgram.update(req.body, {
            where: { program_id: req.params.id }
        });
        res.json(program);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a loyalty program
router.delete('/:id', async (req, res) => {
    try {
        await LoyaltyProgram.destroy({
            where: { program_id: req.params.id }
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
