
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const SECRET_KEY = require('../config').SECRET_KEY;
const asyncHandler= require("express-async-handler")

exports.registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ email, name, password: hashedPassword, role: 0 });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
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
            const email= user.email
            console.log(email)
            res.status(200).json({ message: 'Login Success',id:user._id,name:user.name,email:user.email, token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

exports.allUsers = async (req, res) => {
    const keyword= req.query
    ?{
        $or: [
            {name:{ $regex: req.query.search,$options:"i"}},
            {email:{$regex: req.query.search,$options:"i"}}
        ]
    }:{};
    console.log(req.userData.userId)
    const users= await User.find(keyword).find({_id:{$ne: req.userData.userId}})
    res.send(users)
};

