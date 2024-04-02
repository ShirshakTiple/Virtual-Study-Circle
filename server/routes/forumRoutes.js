const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.post('/createThread' , forumController.createThread);
router.get('/getThreads' , forumController.getThreads);
router.post('/threadReply' , forumController.threadReply);
router.get('/getThread/:childThreadId' , forumController.getThread)

module.exports = router;