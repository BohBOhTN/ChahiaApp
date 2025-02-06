const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Middleware to authorize roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password_hash: hashedPassword, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({ error: 'Wrong email' });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Success login', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new user (admin only)
router.post('/', authenticateToken, authorizeRoles('manager'), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password_hash: hashedPassword, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users (admin only)
router.get('/', authenticateToken, authorizeRoles('manager'), async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a user by ID (admin only)
router.get('/:id', authenticateToken, authorizeRoles('manager'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a user by ID (admin only)
router.put('/:id', authenticateToken, authorizeRoles('manager'), async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { user_id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user by ID (admin only)
router.delete('/:id', authenticateToken, authorizeRoles('manager'), async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { user_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
