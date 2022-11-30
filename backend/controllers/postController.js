const asyncHandler = require("express-async-handler");

const User = require('../model/userModel');
const Post = require('../model/postModel');
const cloudinary = require('../utils/cloudinary');
const { default: mongoose } = require("mongoose");






// @desc Get all posts
// @route GET /api/v1/post
// @access  Private
const allPosts = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const posts = await Post.find({}).limit(5).sort({createdAt: "desc"});
    res.status(200).json({
        status: 'success',
        result: posts.length,
        data: {
            posts
        }
    })
})


// @desc upload new post
// @route POST /api/v1/post
// @access  Private
const newPost = asyncHandler(async (req, res) => {
    const { tags, desc } = req.body;
    const userID = req.userId;
    const user = await User.findOne({ _id: userID });
    const result = await cloudinary.uploader.upload(req.file.path,{folder:'posts'});
    const response = await Post.create({
        userID,
        userName: user.name,
        userProfilePic: user.profilePic,
        desc,
        tags,
        images: result.secure_url,
        cloudinary_id: result.public_id,
    });
    user.posts.push(response._id);
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'Your post is uploaded.'
    })
})



// @desc Get all posts of a user
// @route GET /api/v1/post
// @access  Private
const userPosts = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const posts = await Post.find({userID: userId}).sort({createdAt: "desc"});
    res.status(200).json({
        status: 'success',
        result: posts.length,
        data: {
            posts
        }
    })
})


// @desc Like a post
// @route GET /api/v1/post/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
    const userID = req.userId;
    const id  = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('No post with this id!');
    let message;
    const post = await Post.findById(id);
    if(post.likes.includes(userID)){
        post.likes.pull(userID);
        message = 'unsaved';        
    }else{
        post.likes.push(userID);
        message = 'saved';        
    }
    await post.save();
    res.status(200).json({
        status: 'success',
        message,
    })
})



// @desc Save a post
// @route GET /api/v1/post/:id/save
// @access  Private
const savePost = asyncHandler(async (req, res) => {
    const userID = req.userId;
    const postId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(postId)) throw new Error('No post with this id!');

    const user = await User.findById(userID);
    let message; 
    if(user.savedPosts.includes(postId)){
        user.savedPosts.pull(postId);
        message='unsaved';
    }else{
        user.savedPosts.push(postId);
        message='saved';
    }
    await user.save();
    res.status(200).json({
        status: 'success',
        message,
    })
})


module.exports = {
    allPosts,
    newPost,
    userPosts,
    likePost,
    savePost,
}