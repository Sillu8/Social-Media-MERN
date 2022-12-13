const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../model/userModel');
const Conversation = require('../model/conversationModel');


//@desc Register new user
//@route POST /api/v1/user/signup
//@access Public
const signup = asyncHandler(async (req, res) => {
    const { name, username, email, password, phone } = req.body;

    if (!name || !username || !email || !password || !phone) {
        res.status(400);
        throw new Error('Please enter all the fields.')
    }

    const [emailExists, phoneExists, usernameExists] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ phone }),
        User.findOne({ username }),
    ])

    if (emailExists) {
        res.status(400);
        throw new Error('An account with this email already exists!')
    }

    if (phoneExists) {
        res.status(400);
        throw new Error('An account with this phone number already exists!')
    }

    if (usernameExists) {
        res.status(400);
        throw new Error('An account with this username already exists!')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, username, phone, password: hashedPwd
    })

    if (user) {
        res.status(201).json({
            status: 'success',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data!')
    }

})


//@desc Authenticate user
//@route POST /api/v1/user/login
//@access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ((!email) || !password) {
        res.status(400);
        throw new Error('Please enter all the fields.')
    }

    const user = await User.findOne({ email }).select('+password');
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            status: 'success',
            data: {
                _id: user._id,
                name: user.name,
                token: generateToken(user._id)
            }
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials!')
    }

})








//@desc Get user
//@route GET /api/v1/user
//@access private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.userId }).select('-password');
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})


//@desc Get suggestions for user
//@route GET /api/v1/user/suggestions
//@access private
const suggestions = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { following } = await User.findById(userId, { following: 1 });
    following.push(userId)
    const data = await User.find({ _id: { $not: { $in: following } } }, { name: 1, username: 1, profilePic: 1 }).limit(5);
    res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
            data
        }
    })
})




//@desc Follow a new user
//@route PATCH /api/v1/user/follow
//@access private
const followUser = asyncHandler(async (req, res) => {
    const { activeUserId, toBeFollowedId } = req.body;

    const activeUser = await User.findByIdAndUpdate(activeUserId, {
        $addToSet: {
            following: toBeFollowedId
        }
    }, { new: true });

    await User.findByIdAndUpdate(toBeFollowedId, {
        $addToSet: {
            followers: activeUserId
        }
    });

    const conversation = await Conversation.findOne({
        members: { $all: [activeUserId, toBeFollowedId]}
    });


    if(!conversation){
        await Conversation.create({
            members: [activeUserId,toBeFollowedId]
        });
    }

    res.status(200).json({
        status: 'success',
        activeUser,
    })
})


//@desc Unfollow a user
//@route PATCH /api/v1/user/unfollow
//@access private
const unfollowUser = asyncHandler(async (req, res) => {
    const { activeUserId, toBeUnfollowedId } = req.body;
    const activeUser = await User.findByIdAndUpdate(activeUserId, {
        $pull: {
            following: toBeUnfollowedId
        }
    }, { new: true });

    await User.findByIdAndUpdate(toBeUnfollowedId, {
        $pull: {
            followers: activeUserId
        }
    });

    res.status(200).json({
        status: 'success',
        activeUser,
    })
})



const generateToken = (id) => {
    token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}


module.exports = {
    getUser,
    login,
    signup,
    suggestions,
    followUser,
    unfollowUser,
}