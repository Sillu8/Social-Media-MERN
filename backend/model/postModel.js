const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    desc: {
        type: String,
    },
    userName: {
        type: String,
    },
    userProfilePic: {
        type: String,
    },
    images: {
        type: String,
    },
    cloudinary_id: {
        type: String,
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
    tags: {
        type: [String],
        default: [],
    },
    saves: {
        type: Object,
        default: [],
    }
}, {timestamps: true});

module.exports = mongoose.model('Post',postSchema);