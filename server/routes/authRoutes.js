const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authMiddleware} = require("../middleware/authMiddleware")
console.log("protect",authMiddleware)

router.post('/register', authController.registerUser);
router.get('/users', authController.getAllUsers);
router.route("/users1").get(authMiddleware, authController.allUsers);
router.post('/login', authController.loginUser);

module.exports = router;
