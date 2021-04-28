const Transaction = require('../models/Transaction');
const { getPostData } = require('../utils');
const jwt = require('jsonwebtoken');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  authenticated
exports.getTransactions = async (req, res) => {
    try {
        let userId;
        const token = await req.headers["x-auth-token"];
        if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                data: "access denied. no token provided"
            }));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: tfalse,
                    data: "invalid token"
                }));
            }
            userId = decoded._id;
        });
        const transactions = await Transaction.find({ userId });

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
// @access  authenticated
exports.addTransaction = async (req, res) => {
    try {
        let userId;
        const token = await req.headers["x-auth-token"];
        if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                data: "access denied. no token provided"
            }));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: tfalse,
                    data: "invalid token"
                }));
            }
            userId = decoded._id;
        });
        const body = await getPostData(req)
        const { text, amount } = JSON.parse(body)


        const newTransaction = await Transaction.create({ text, amount, userId });

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
// @access  authenticated
exports.deleteTransaction = async (req, res, id) => {
    try {
        let userId;
        const token = await req.headers["x-auth-token"];
        if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                data: "access denied. no token provided"
            }));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: tfalse,
                    data: "invalid token"
                }));
            }

            userId = decoded._id;
        });
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: 'No transaction found'
            }))

        }
        if (userId !== transaction.userId) {
            res.writeHead(401, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: 'access denied.'
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