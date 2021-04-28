const User = require('../models/User');
const bcrypt = require('bcrypt');
const { getPostData } = require('../utils');

// @desc    Add User
// @route   POST /register
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        const body = await getPostData(req)
        let { username, password } = JSON.parse(body)

        let user = await User.findOne({ username });
        if (user) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: "username already exist"
            }))
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username, password
        });

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({
            success: true,
            data: newUser
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
            res.writeHead(500, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: 'Server Error'
            }))
        }
    }
}

// @desc    Login User
// @route   POST /login
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        const body = await getPostData(req)
        let { username, password } = JSON.parse(body)

        let user = await User.findOne({ username });
        if (!user) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: "invalid username"
            }))
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: "invalid password"
            }))
        }

        const token = user.generateAuthToken();

        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({
            success: true,
            data: token
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
            res.writeHead(500, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({
                success: false,
                error: 'Server Error'
            }))
        }
    }
}


