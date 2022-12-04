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
    const posts = await Post.find({}).limit(5).sort({ createdAt: "desc" });
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
    try {
        const result = await cloudinary.uploader.upload(req.file?.path, { folder: 'posts' });
        const post = await Post.create({
            userID,
            userName: user.name,
            userProfilePic: user.profilePic,
            desc,
            tags,
            images: result.secure_url,
            cloudinary_id: result.public_id,
        });
        user.posts.push(post._id);
        const userData = await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Your post is uploaded.',
            post,
        })

    } catch (error) {
        console.log(error);
        if (error.message) {
            res.status(400)
            throw new Error(error.message)
        } else {
            res.status(400)
            throw new Error('Please check your network connection')
        }
    }
})



// @desc Get all posts of a user
// @route GET /api/v1/post
// @access  Private
const userPosts = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const posts = await Post.find({ userID: userId }).sort({ createdAt: "desc" });
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
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error('No post with this id!');
    const post = await Post.findByIdAndUpdate(postId, {
        $push: {
            likes: userID
        }
    }, { new: true });
    res.status(200).json({
        status: 'success',
        post,
    })

})


// @desc Unlike a post
// @route GET /api/v1/post/:id/unlike
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
    const userID = req.userId;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error('No post with this id!');
    const post = await Post.findByIdAndUpdate(postId, {
        $pull: {
            likes: userID
        }
    }, { new: true });
    res.status(200).json({
        status: 'success',
        post,
    })
})



// @desc Save a post
// @route GET /api/v1/post/:id/save
// @access  Private
const savePost = asyncHandler(async (req, res) => {
    const userID = req.userId;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error('No post with this id!');

    const user = await User.findById(userID);
    let message;
    if (user.savedPosts.includes(postId)) {
        user.savedPosts.pull(postId);
        message = 'unsaved';
    } else {
        user.savedPosts.push(postId);
        message = 'saved';
    }
    await user.save();
    res.status(200).json({
        status: 'success',
        message,
    })
});




// @desc Add a new comment
// @route GET /api/v1/post/:id/comment
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const userID = req.userId;
    const postId = req.params.id;
    const { Comment } = req.body;
    const time = new Date().toISOString();

    if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error('No post with this id!');

    const { username, profilePic } = await User.findById(userID, { username: 1, profilePic: 1 });
    const post = await Post.findByIdAndUpdate(postId, {
        $push: {
            comments: {
                commentedUserId: userID,
                commentedUsername: username,
                commentedUserpic: profilePic,
                comment: Comment,
                time,
            }
        }
    }, { new: true })

    const length = post.comments.length;
    res.status(200).json({
        status: 'success',
        comment: post.comments[length - 1]
    })
});


module.exports = {
    allPosts,
    newPost,
    userPosts,
    likePost,
    savePost,
    addComment,
    unlikePost
}