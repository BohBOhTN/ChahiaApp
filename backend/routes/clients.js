const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Create a new client
router.post('/', async (req, res) => {
    try {
        const { name, contact, business_type } = req.body;
        const newClient = await Client.create({ name, contact, business_type });
        res.status(201).json(newClient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single client by ID
router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a client by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, contact, business_type } = req.body;
        const [updated] = await Client.update({ name, contact, business_type }, {
            where: { client_id: req.params.id }
        });
        if (updated) {
            const updatedClient = await Client.findByPk(req.params.id);
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a client by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Client.destroy({
            where: { client_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
