const Transaction = require('../models/Transaction');
const { getPostData } = require('../utils');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            count: transactions.length,
            data: transactions
        }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            error: 'Server Error'
        }));
    }
}

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Public
exports.addTransaction = async (req, res) => {
    try {
        const body = await getPostData(req)
        const { text, amount } = JSON.parse(body)

        const transaction = {
            text, amount
        }

        const newTransaction = await Transaction.create(transaction);

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({
            success: true,
            data: newTransaction
        }))

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            res.writeHead(400, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: messages
            }))
        } else {
            es.writeHead(500, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: 'Server Error'
            }))
        }
    }
}

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, id) => {
    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: 'No transaction found'
            }))

        }

        await transaction.remove(id);
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ message: `Transaction with id ${id} has been removed` }))

    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({
            success: false,
            error: 'Server Error'
        }))

    }
}