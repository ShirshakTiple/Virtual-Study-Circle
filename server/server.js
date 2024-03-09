const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');
const File = require('./models/fileSchema');
const SECRET_KEY = 'secret_key';
const multer = require('multer');
//connect to express app
const app = express();

//connect to Mongodb
const dbURI = 'mongodb+srv://se_project:se_project@cluster0.qqtl6xn.mongodb.net/Project?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(app.listen(3001) ,() => {
    console.log('Server is running on port 3000');
}).catch((error) => {
    console.log('unable to connect')
})


//middleware
app.use(bodyParser.json());
app.use(cors());


//Routes
app.post('/register' , async (req, res) => {
    try{
        const {email , name , password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const existingUser = await User.findOne({ email: email})
        if(existingUser){
            return res.status(400).json({
                error: 'User already exists'
            })
        }
        const newUser = new User({
            email, name, password:hashedPassword, role: 0
        })
        await newUser.save()
        res.status(201).json({
            message: 'User registered successfully'
        })
    }
    catch(error){
        res.status(500).json({
            error: 'Error registering' 
        })
    }
})

app.get('/register' , async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({
            error: 'Unable to find users' 
        })
    }
})


app.post('/login' , async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
                const token = jwt.sign({
                    _id: user._id,
                    role: user.role
                }, SECRET_KEY , {expiresIn: '1hr'})
                res.status(200).json({
                    message: 'Login Success'
                })
            }
            else{
                res.status(401).json({
                    message: 'Invalid credentials'
                })
            }
        }
        else{
            res.status(401).json({
                message: 'Invalid credentials'
            })
        }
    }
    catch(error){
        res.status(500).json({
            error: 'Error logging in' 
        })
    }
})


//upload files
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file' });
        }

        const { title } = req.body;
        
        // Check if a file with the same title already exists
        const existingFile = await File.findOne({ title });
        if (existingFile) {
            return res.status(400).json({ error: 'Same title' });
        }

        // Save file content and metadata to MongoDB
        const buffer = req.file.buffer; // Get file content as buffer\
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
});

app.get('/files/:title', async (req, res) => {
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
});


app.get('/files', async (req, res) => {
    try {
        const files = await File.find({}, { title: 1 , filename: 1 }); // Retrieve only titles
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files list:', error);
        res.status(500).json({ error: 'Error fetching files list' });
    }
});

app.delete('/files/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const deletedFile = await File.findOneAndDelete({title: title});

        if (!deletedFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Error deleting file' });
    }
});
