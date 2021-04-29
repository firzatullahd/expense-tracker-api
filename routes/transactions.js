const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');
const auth = require('../middleware/auth');

router.get('/transactions', auth, getTransactions)
router.post('/transactions', auth, addTransaction);
router.delete('/transactions/:id', auth, deleteTransaction);

module.exports = router;