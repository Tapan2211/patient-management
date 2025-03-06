const userModel = require('../model/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (name, email, password) => {
    const existUser = await userModel.findOne({ email });
    if (existUser) throw new Error('User already registered');

    const newUser = await userModel({ name, email, password });
    await newUser.save();
    return newUser;
}

// Login User
const loginUser = async (email, password) => {
    const user = await userModel.findOne({ email });

    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Invalid email or password');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email } };
};

// Get All Users
const getAllUsers = async () => {
    return await userModel.find().sort({ name: 1 }).lean();
}


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
}