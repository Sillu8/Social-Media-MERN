const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name!']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email!'],
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number!']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password!'],
        select: false
    },
    profilePic: {
        type: String,
        default: null,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    unseenNotifications: {
        type: [String],
        default: null
    },
    seenNotifications: {
        type: [String],
        default: null
    },
},{timestamps: true})

module.exports = mongoose.model('Admin', adminSchema);