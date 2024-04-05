const User = require('../models/userSchema')
const Chat = require('../models/chatModel')

exports.accessChat = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log("UseId param not sent with userId")
        return res.sendStatus(400)
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.userData.userId } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name email",
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.userData.userId, userId]
        }

        try {
            const createdChat = await Chat.create(chatData);
            const fullData = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")
            res.status(200).send(fullData)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
};

exports.fetchChat = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.userData.userId } } }).populate("users", "-password")
            .populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    sender: "name",
                })
                res.status(200).send(results)
            })
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
};

exports.createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "please fill all the fields" });
    }

    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat")
    }

    users.push(req.userData.userId)
    //console.log(req.body.users)

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.userData.userId,
        })
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
};

exports.renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!updatedChat) {
        res.status(404)
        throw new Error("Chat not found")
    }
    else {
        res.json(updatedChat)
    }
};

exports.addToGroup = async (req, res) => {
    const { chatId, userId } = req.body
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        { new: true }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!added) {
        res.status(400)
        throw new Error("Chat not found")
    } else {
        res.json(added)
    }
};

exports.removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        { new: true }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!removed) {
        res.status(400)
        throw new Error("Chat not found")
    } else {
        res.json(removed)
    }
};


