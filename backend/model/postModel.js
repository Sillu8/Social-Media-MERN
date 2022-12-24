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
        required: [true,'No image'],
    },
    cloudinary_id: {
        type: String,
        required: true,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    comments: [{
        commentedUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        commentedUsername: {
            type: String,
            required: true,
        },
        commentedUserpic: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        }
    }],
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
    },
    report: [
        {
            reportedUserId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            reason: {
                type: String,
                required: true,
            },
            time:{
                type: Date,
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);