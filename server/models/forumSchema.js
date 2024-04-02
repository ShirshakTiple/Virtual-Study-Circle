const mongoose = require('mongoose');

// Schema for forum threads
const forumSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the logged-in user
    title: String,
    created_at: { type: Date, default: Date.now },
    parent_thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', default: null }, // Reference to parent thread
    child_threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forum' }], // Array of child threads
    message: String,
    file: { 
        data: Buffer, // Buffer to store file data
        contentType: String, // MIME type of the file
        fileName: String // Original filename
    }
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
