const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name!']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email!'],
    },
    username: {
        type: String,
        required: [true, 'Please enter a username!'],
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number!']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password!'],
        select: false,
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: null,
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: null,
    },
    profilePic: {
        type: String,
        default: null,
    },
    unseenNotifications: {
        type: [String],
        default: null
    },
    seenNotifications: {
        type: [String],
        default: null
    },
    details: {
        relation: {
            type: String,
            enum: {
                values: ['single', 'married'],
                message: '{VALUE} is not supported!'
            }
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female','genderqueer'],
                message: '{VALUE} is not supported!'
            }
        },
        bio: String,
        work: String,
        education: String,
        city: String,
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
    },
    savedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: [],
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);