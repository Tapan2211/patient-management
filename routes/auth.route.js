const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/', authController.getAllUsers);

module.exports = router;
