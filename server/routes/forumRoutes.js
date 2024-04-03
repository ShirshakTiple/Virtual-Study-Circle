const express = require('express');
const router = express.Router();
const multer = require('multer');
const forumController = require('../controllers/forumController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createThread' , upload.single('file'), forumController.createThread);
router.get('/getThreads' , forumController.getThreads);
router.post('/threadReply' , upload.single('file'), forumController.threadReply);
// router.get('/getThread/:childThreadId' , forumController.getThread)

module.exports = router;