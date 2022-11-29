const asyncHandler = require("express-async-handler");

const User = require('../model/userModel');
const Post = require('../model/postModel');
const cloudinary = require('../utils/cloudinary');






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
    const [result] = await cloudinary.uploader.upload(req.file.path);
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

module.exports = {
    allPosts,
    newPost,
}