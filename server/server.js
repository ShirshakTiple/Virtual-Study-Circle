const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require("./routes/messageRoutes")
const Message = require('./models/messageModel')
const Chat = require('./models/chatModel')
const User = require('./models/userSchema')
const app = express();

// Connect to MongoDB
const dbURI = require('./config').dbURI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/file', fileRoutes);
app.use('/chat',chatRoutes);
app.use('/messages',messageRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3001;
const server= app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")

    socket.on('setup',(userData)=>{
          socket.join(userData.id)
          console.log(userData.id)
          socket.emit("connected")
    })

    socket.on('join chat',(room)=>{
        socket.join(room)
        console.log('User joined',room)
    })

    socket.on("typing",(room)=> socket.in(room).emit("typing"))
    socket.on("stop typing",(room)=> socket.in(room).emit("stop typing"))

    socket.on('new message',(newMessageReceived)=>{
        var chat= newMessageReceived.chat
        if(!chat.users) return console.log('chat.users not defined')

        chat.users.forEach(user=>{
            if(user._id == newMessageReceived.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageReceived)
        })
    })
})

module.exports = app;
