const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config').SECRET_KEY;
const User = require('../models/userSchema');
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract token from authorization header

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }

        const decoded = jwt.verify(token, SECRET_KEY); // Verify token

        const user = await User.findById(decoded._id); // Check if user exists

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }
        
        req.userData = { userId: decoded._id, userRole: decoded.role}; // Attach user data to request object
        //req.userData = await User.findById(decoded._id).select("-password");
        next(); // Proceed to next middleware
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};
console.log("auth",authMiddleware)
module.exports = {authMiddleware};
