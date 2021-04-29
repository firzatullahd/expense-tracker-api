const User = require('../models/User');
const bcrypt = require('bcrypt');
const winston = require('winston');

// @desc    Add User
// @route   POST /api/register
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        let { username, password } = req.body

        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                error: "username already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username, password
        });

        return res.status(201).json({
            success: true,
            data: newUser
        })
    } catch (err) {
        winston.error(err.message, err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Login User
// @route   POST /api/login
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        let { username, password } = req.body

        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "invalid username"
            })
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: "invalid password"
            })
        }

        const token = user.generateAuthToken();
        return res.status(200).json({
            success: true,
            data: token
        })
    } catch (err) {
        winston.error(err.message, err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}


