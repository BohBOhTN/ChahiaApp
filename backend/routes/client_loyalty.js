const express = require('express');
const router = express.Router();
const ClientLoyalty = require('../models/ClientLoyalty');

// Get all client loyalty records
router.get('/', async (req, res) => {
    try {
        const clients = await ClientLoyalty.findAll();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new client loyalty record
router.post('/', async (req, res) => {
    try {
        const client = await ClientLoyalty.create(req.body);
        res.status(201).json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a client loyalty record
router.put('/:id', async (req, res) => {
    try {
        const client = await ClientLoyalty.update(req.body, {
            where: { client_id: req.params.id }
        });
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a client loyalty record
router.delete('/:id', async (req, res) => {
    try {
        await ClientLoyalty.destroy({
            where: { client_id: req.params.id }
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
