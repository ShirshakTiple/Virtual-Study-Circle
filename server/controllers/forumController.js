const Forum = require('../models/forumSchema');
const User = require('../models/userSchema');
const SECRET_KEY = require('../config').SECRET_KEY;
const jwt = require('jsonwebtoken');

exports.createThread = async (req, res) => {
    try {
        const { title, thread, token } = req.body;
        const decoded = jwt.verify(token, SECRET_KEY)
        const newForum = new Forum({ user_id: decoded._id, title: title, message: thread });
        if (req.file) {
            newForum.file = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                fileName: req.file.originalname
            }
        }
        await newForum.save();
        res.status(200).json({ message: 'Thread created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error registering' });
    }
}

// Assuming the model file is in the same directory
exports.getThreads = async (req, res) => {
    try {
        const threads = await Forum.find()
            .populate('user_id') // Populate the user_id field with user details
            .populate('child_threads') // Populate the child_threads array with child threads
            .populate({
                path: 'child_threads',
                populate: { path: 'user_id', model: 'User' } // Populate child thread user details
            });

        // Transform threads into hierarchical structure
        const threadsHierarchy = threads.reduce((acc, thread) => {
            if (!thread.parent_thread) {
                acc.push({ parent: thread, children: [] });
            } else {
                const parentThread = acc.find(parent => parent.parent._id.equals(thread.parent_thread));
                if (parentThread) {
                    parentThread.children.push(thread);
                }
            }
            return acc;
        }, []);

        // console.log(threadsHierarchy);

        res.status(200).json(threadsHierarchy); // Send the transformed hierarchical structure to the frontend
    } catch (error) {
        console.error('Error fetching threads:', error);
        res.status(500).json({ error: 'Error fetching threads' });
    }
};



exports.threadReply = async (req, res) => {
    try {
        const { reply, threadId, token } = req.body;
        const decoded = jwt.verify(token, SECRET_KEY)
        const newReply = await Forum({ user_id: decoded._id, parent_thread: threadId, message: reply })
        if (req.file) {
            newReply.file = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                fileName: req.file.originalname
            }
        }
        await newReply.save();
        const updatedThread = await Forum.findByIdAndUpdate(threadId, { $push: { child_threads: newReply._id } }, { new: true });
        res.status(200).json({ message: "success" })
    } catch (error) {
        res.status(500).json({ error: 'Error' });
    }
}

// exports.getThread = async (req, res) => {
//     try {
//         const threadId = req.params.childThreadId; // Extract the thread ID from the request parameters
//         const thread = await Forum.findById(threadId); // Find the thread by its ID in the database
//         if (!thread) {
//             return res.status(404).json({ error: 'Thread not found' }); // Thread not found
//         }
//         return thread; // Return the thread object
//     } catch (error) {
//         console.error('Error fetching thread:', error);
//         throw new Error('Internal server error'); // Throw an error
//     }
// };
