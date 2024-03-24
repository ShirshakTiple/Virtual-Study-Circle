const express= require("express");
const { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatControllers");
//const protect =require("../middleware/authMiddleware")
const {authMiddleware} = require("../middleware/authMiddleware")
const router = express.Router()

router.route("/").post(authMiddleware, accessChat)
router.route("/").get(authMiddleware, fetchChat)
router.route("/group").post(authMiddleware, createGroupChat)
router.route("/rename").put(authMiddleware, renameGroup)
router.route("/groupremove").put(authMiddleware, removeFromGroup)
router.route("/groupadd").put(authMiddleware, addToGroup)

module.exports = router;
