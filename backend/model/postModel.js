const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    desc: {
        type: String,
    },
    images: {
        type: [String],
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    location: {
        type: String,
    },
    tags: [String],
}, {timestamps: true});

module.exports = mongoose.model('Post',postSchema);