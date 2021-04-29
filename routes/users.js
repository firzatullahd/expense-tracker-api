const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/users');

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;