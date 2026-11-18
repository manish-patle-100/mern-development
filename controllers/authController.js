const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword 
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            message: "User registered successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error during registration" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Generate the JWT Token
        const token = jwt.sign(
            { userId: user._id }, 
            "mySuperSecretKey", 
            { expiresIn: "1d" } 
        );

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            name: user.name
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error during login" });
    }
};

module.exports = { registerUser, loginUser };