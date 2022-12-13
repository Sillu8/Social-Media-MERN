const asyncHandler = require('express-async-handler');

const Message = require('../model/messageModel');



//@desc Post a new message
//@route POST api/v1/message
//access Private
const newMessage = asyncHandler(async (req,res) => {

    const { conversationId, sender, text } = req.body;

    if(!conversationId || !sender || !text){
        throw new Error('Dude error in req.body');
    }

    const message = await Message.create({
        conversationId, sender, text,
    });

    res.status(200).json({
        status: 'success',
        message,
    })
})


//@desc Post a new message
//@route POST api/v1/message
//access Private
const getMessages = asyncHandler(async (req,res) => {

    const conversationId = req.params.conversationId;

    if(!conversationId ){
        throw new Error('Dude, No convo with that id');
    }

    const messages = await Message.find({
        conversationId
    }).limit(20);

    res.status(200).json({
        status: 'success',
        messages,
    })
})




module.exports = {
    newMessage,
    getMessages
}