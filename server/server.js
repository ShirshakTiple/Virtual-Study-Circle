const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');
const SECRET_KEY = 'secret_key'
//connect to express app
const app = express();

//connect to Mongodb
const dbURI = 'mongodb+srv://se_project:se_project@cluster0.qqtl6xn.mongodb.net/Project?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(
    dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    
}).then(app.listen(3001) ,() => {
    console.log('Server is running on port 3000');
}).catch((error) => 
    {
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