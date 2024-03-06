const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {type : 'string',required: true,unique: true},
    name : {type : 'string',required: true},
    password : {type :'string',required: true},
    role : {type : 'number'} 
})

const User = mongoose.model('User', userSchema);

module.exports = User;