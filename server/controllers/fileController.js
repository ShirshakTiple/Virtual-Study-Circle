
const multer = require('multer');
const File = require('../models/fileSchema');


exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file' });
        }

        const { title } = req.body;
        
        const existingFile = await File.findOne({ title });
        if (existingFile) {
            return res.status(400).json({ error: 'Same title' });
        }

        const buffer = req.file.buffer;
        const existingContentFile = await File.findOne({ data: buffer });
        if (existingContentFile) {
            return res.status(400).json({ error: 'Same file' });
        }

        const uploadDate = new Date();
        const file = new File({
            title,
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            uploadDate,
            data: buffer
        });
        await file.save();
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
};

exports.getFileByTitle = async (req, res) => {
    try {
        const fileTitle = req.params.title;
        const file = await File.findOne({ title: fileTitle });

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.set('Content-Type', file.contentType);
        res.send(file.data);
    } catch (error) {
        console.error('Error retrieving file:', error);
        res.status(500).send('Error retrieving file');
    }
};

exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find({}, { title: 1 , filename: 1 });
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files list:', error);
        res.status(500).json({ error: 'Error fetching files list' });
    }
};

// exports.deleteFileByTitle = async (req, res) => {
//     try {
//         const title = req.params.title;
//         const deletedFile = await File.findOneAndDelete({ title });

//         if (!deletedFile) {
//             return res.status(404).json({ error: 'File not found' });
//         }

//         res.status(200).json({ message: 'File deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting file:', error);
//         res.status(500).json({ error: 'Error deleting file' });
//     }
// };

