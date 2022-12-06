const asyncHandler = require('express-async-handler');

const Conversation = require('../model/conversationModel');
const User = require('../model/userModel');




//@desc Create a new conversation
//@route POST api/v1/conversation
//access Private
const newConversation = asyncHandler(async (req, res) => {

    const senderId = req.userId;
    const { receiverId } = req.body;

    if(!senderId || !receiverId){
        throw new Error('Invalid member id!')
    }

    const conversation = await Conversation.create({
        members: [senderId,receiverId]
    });   

    res.status(200).json({
        status: 'success',
        conversation,
    })
})


//@desc Get a conversation
//@route GET api/v1/conversation
//access Private
const getConversation = asyncHandler(async (req, res) => {

    const senderId = req.userId;

    if(!senderId){
        throw new Error('Invalid member id!')
    }

    const conversation = await Conversation.find({
        members: {
            $in: [ senderId ]
        }
    })

    res.status(200).json({
        status: 'success',
        conversation,
    })
})



//@desc Get friend
//@route GET api/v1/conversation/:friendId
//access Private
const getFriend = asyncHandler(async (req, res) => {

    const friendId = req.params.friendId; 

    if(!friendId){
        throw new Error('Invalid friend id!')
    }

    const friend = await User.findById(friendId,{username: 1, name: 1, profilePic: 1});

    res.status(200).json({
        status: 'success',
        friend,
    })
})






module.exports = {
    getConversation,
    newConversation,
    getFriend,
}