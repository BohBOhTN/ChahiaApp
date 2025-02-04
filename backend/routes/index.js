const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/suppliers', require('./suppliers'));
router.use('/products', require('./products'));
router.use('/clients', require('./clients'));
router.use('/purchases', require('./purchases'));
router.use('/sales', require('./sales'));
router.use('/creditPayments', require('./creditPayments'));
router.use('/paymentHistory', require('./paymentHistory'));
router.use('/expenseCategories', require('./expenseCategories'));
router.use('/expenses', require('./expenses'));

module.exports = router;
