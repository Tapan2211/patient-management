const userService = require('../services/auth.service');

//Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await userService.registerUser(name, email, password);
        res.status(201).json({ success: true, message: 'User registered successfully', data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

//Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Call loginUser function from service
        const response = await userService.loginUser(email, password);

        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        console.log("Sorted Users:", users);
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
}