
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const SECRET_KEY = require('../config').SECRET_KEY;
const asyncHandler = require("express-async-handler")


const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the format
    if (!emailRegex.test(email)) {
        return 'Email must be in a valid format.';
    }

    // Extract the domain from the email
    const [, domain] = email.split('@');

    // List of valid domains
    const validDomains = ['gmail.com', 'yahoo.com', 'hotmail.com']; // Add more valid domains as needed

    // Check if the domain is valid
    if (!validDomains.includes(domain)) {
        return 'Email domain is not supported.';
    }

    return true; // Email is valid
};

const validatePassword = (password) => {
    // Regular expressions to validate password strength
    const containsLetter = /[a-zA-Z]/;
    const containsNumber = /\d/;

    // Check if password contains at least one letter and one number
    const hasLetter = containsLetter.test(password);
    const hasNumber = containsNumber.test(password);

    // Check if password length is at least 8 characters
    const hasValidLength = password.length >= 8;

    // Initialize an empty array to store error messages
    const errors = [];

    // Check individual criteria and add corresponding error messages to the array
    if (!hasLetter) {
        errors.push("Password must contain at least one letter.");
    }
    if (!hasNumber) {
        errors.push("Password must contain at least one number.");
    }
    if (!hasValidLength) {
        errors.push("Password must be at least 8 characters long.");
    }

    // Return an object with a boolean indicating validity and an array of error messages
    return {
        valid: hasLetter && hasNumber && hasValidLength,
        errors: errors
    };
};

exports.registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Validate email format
        const emailValidation = validateEmail(email);
        if (typeof emailValidation === 'string') {
            return res.status(400).json({ error: emailValidation });
        }

        // Check if email is already registered
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Check if username is already taken
        const existingUserByName = await User.findOne({ name });
        if (existingUserByName) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            const errorMessage = passwordValidation.errors.join('. ');

            // Return the concatenated error message along with the response
            return res.status(400).json({ error: `Invalid password. ${errorMessage}` });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ email, name, password: hashedPassword, role: 0 });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering:', error);
        res.status(500).json({ error: 'Error registering' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to find users' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ _id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1hr' });
            const email = user.email
            console.log(email)
            res.status(200).json({ message: 'Login Success', id: user._id, name: user.name, email: user.email, token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

exports.allUsers = async (req, res) => {
    const keyword = req.query
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        } : {};
    console.log(req.userData.userId)
    const users = await User.find(keyword).find({ _id: { $ne: req.userData.userId } })
    res.send(users)
};

