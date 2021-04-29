const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const winston = require('winston');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  authenticated
exports.getTransactions = async (req, res) => {
    try {
        let userId = req.userId;
        const transactions = await Transaction.find({ userId });

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })

    } catch (err) {
        winston.error(err.message, err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Add transaction
// @route   POST /api/transactions
// @access  authenticated
exports.addTransaction = async (req, res) => {
    try {
        let userId = req.userId;
        const { text, amount } = req.body;

        const newTransaction = await Transaction.create({ text, amount, userId });
        return res.status(201).json({
            success: true,
            data: newTransaction
        })

    } catch (err) {
        winston.error(err.message, err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  authenticated
exports.deleteTransaction = async (req, res) => {
    try {
        let userId = req.userId;
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({
                success: false,
                error: 'Invalid Transaction ID'
            })

        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }
        if (userId !== transaction.userId) {
            console.log(userId, transaction.userId)
            return res.status(401).json({
                success: false,
                error: 'access denied.'
            })
        }

        await transaction.remove();
        return res.status(200).json({
            success: true,
            message: `Transaction with id ${req.params.id} has been removed`
        })
    } catch (err) {
        winston.error(err.message, err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}