const express = require("express");
const { sendMessage, allMessages } = require("../controllers/messageControllers");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware")

router.route("/").post(authMiddleware, sendMessage);
router.route("/:chatId").get(authMiddleware, allMessages);

module.exports= router