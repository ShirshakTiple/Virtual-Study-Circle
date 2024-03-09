const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: {type: String,unique: true,required: true},
    filename: String,
    contentType: String,
    uploadDate: Date,
    data: Buffer
});

const File = mongoose.model('File', fileSchema);

module.exports = File;