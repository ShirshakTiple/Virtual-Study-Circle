const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const fileController = require('../controllers/fileController');

// Multer configuration to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), fileController.uploadFile); // Use upload middleware here
router.get('/:title', fileController.getFileByTitle);
router.get('/', fileController.getAllFiles);
router.delete('/:title', fileController.deleteFileByTitle);

module.exports = router;

