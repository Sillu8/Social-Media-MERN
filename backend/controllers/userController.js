const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../model/userModel');
const Conversation = require('../model/conversationModel');
const cloudinary = require('../utils/cloudinary')

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true,
})


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

    const otpResponse = await client.verify
        .services(TWILIO_SERVICE_SID)
        .verifications.create({
            to: `+91${phone}`,
            channel: 'sms',
        });


    res.status(200).json({
        status: 'success',
        message: 'An otp has been sent to your phone number!'
    });
})


//@desc Register new user
//@route POST /api/v1/user/verify
//@access Public
const verifyOtp = asyncHandler(async (req, res) => {
    try {
        const { digit1, digit2, digit3, digit4, digit5, digit6 } = req.body;
        const otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

        const { name, username, email, password, phone } = req.body.state;

        if ((!otp)) {
            res.status(400);
            throw new Error('Please enter the otp!')
        }

        const verifiedRes = await client.verify
            .services(TWILIO_SERVICE_SID)
            .verificationChecks.create({
                to: `+91${phone}`,
                code: otp,
            });

        if (!verifiedRes.valid) {
            res.status(400);
            throw new Error('Invalid otp!')
        }

        if (verifiedRes.valid) {

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
        }

    } catch (error) {
        console.log(error);
        res.status(error?.status || 400)
        throw new Error('Something unexpected occurred!');
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



//@desc  Send an Otp
//@route POST /api/v1/user/sendOtp
//@access Public
const sendOtp = asyncHandler(async (req, res) => {
    const { phone } = req.body;

    if ((!phone)) {
        res.status(400);
        throw new Error('Invalid Phone number!')
    }

    const user = await User.findOne({ phone: phone });
    if (!user) {
        res.status(400);
        throw new Error('An account with this phone number does not exist!')
    }

    const otpResponse = await client.verify
        .services(TWILIO_SERVICE_SID)
        .verifications.create({
            to: `+91${phone}`,
            channel: 'sms',
        });


    res.status(200).json({
        status: 'success',
        message: 'An otp has been sent to your phone number!'
    });

})


//@desc  Verify Otp for forget password
//@route POST /api/v1/user/forgotPassword
//@access Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { digit1, digit2, digit3, digit4, digit5, digit6, phone } = req.body;
    const otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;


    const verifiedRes = await client.verify
        .services(TWILIO_SERVICE_SID)
        .verificationChecks.create({
            to: `+91${phone}`,
            code: otp,
        });

    if (!verifiedRes.valid) {
        res.status(400);
        throw new Error('Invalid otp!')
    }

    if (verifiedRes.valid) {
        res.status(200).json({
            status: 'success',
            message: 'Enter your new password.'
        });
    }
})



//@desc  Change Users password
//@route POST /api/v1/user/changePassword
//@access Public
const changePassword = asyncHandler(async (req, res) => {
    const { password, phone } = req.body;

    if (!password || !phone) {
        res.status(400);
        throw new Error('Data missing');
    }


    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(phone, { password: hashedPwd });
    console.log(user);

    res.status(200).json({
        status: 'success',
        user
    })
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


//@desc Get user
//@route GET /api/v1/user/:username
//@access private
const getUserData = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})



//@desc Edit Profile
//@route PUT /api/v1/user
//@access private
const editProfile = asyncHandler(async (req, res) => {
    const userId = req.userId
    const { name, bio, work, education, city, gender, relation } = req.body;

    const user = await User.findByIdAndUpdate(userId, {
        $set: {
            name,
            details: {
                relation,
                gender,
                bio,
                work,
                education,
                city
            }
        }
    }, { new: true })
    res.status(200).json({
        status: 'success',
        data: {
            user
        },
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
        members: { $all: [activeUserId, toBeFollowedId] }
    });


    if (!conversation) {
        await Conversation.create({
            members: [activeUserId, toBeFollowedId]
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
});


//@desc Get followers data
//@route GET /api/v1/user/followers/:username
//@access private
const getFollowersData = asyncHandler(async (req, res) => {
    try {
        const { username } = req.params;

        const { followers } = await User.findOne({ username }, { username: 1 }).populate('followers', { username: 1 });

        res.status(200).json({
            status: 'success',
            data: {
                followers
            }
        })

    } catch (error) {
        console.log(error);
        throw new Error('Some unknown error!')
    }
})



//@desc Get followers data
//@route GET /api/v1/user/followings/:username
//@access private
const getFollowingsData = asyncHandler(async (req, res) => {
    try {
        const { username } = req.params;

        const { following } = await User.findOne({ username }, { username: 1 }).populate('following', { username: 1 });

        res.status(200).json({
            status: 'success',
            data: {
                following
            }
        })

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
})


//@desc Get Unread notifications
//@route GET /api/v1/user/notifications/unseen/:userId
//@access private
const getUnreadNotifications = asyncHandler(async (req, res) => {
    const { userId } = req.params;


    const result = await User.findById(userId, { unseenNotifications: 1 });

    res.status(200).json({
        status: 'success',
        result
    })
})



//@desc Get read notifications
//@route GET /api/v1/user/notifications/seen/:userId
//@access private
const getReadNotifications = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const result = await User.findById(userId, { seenNotifications: 1 });

    res.status(200).json({
        status: 'success',
        result
    })
})

//@desc Set notification as read
//@route GET /api/v1/user/notification/:id
//@access private
const markAsRead = asyncHandler(async (req, res) => {
    const notificationId = req.params.id;

    const user = await User.findOne(
        {
            "unseenNotifications._id": notificationId
        },
        {
            "unseenNotifications.$": 1,
            seenNotifications: 1,
        }
    );

    const seenNotifications = user.seenNotifications;
    seenNotifications.push(user.unseenNotifications[0]);

    await User.findByIdAndUpdate(user._id, {
        seenNotifications
    });

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $pull: {
                unseenNotifications: {
                    _id: notificationId
                }
            }
        },
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        updatedUser
    })
});




//@desc Edit Profile Pic
//@route GET /api/v1/user/:userId/profilepic
//@access private
const editProfilePic = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        const file = req.file;
        const result = await cloudinary.uploader.upload(file?.path, { folder: 'users' });

        console.log(result);
        const user = await User.findByIdAndUpdate(userId,
            {
                profilePic: result.secure_url,
                public_id: result.public_id
            }, { new: true });

        console.log(user)

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
})



//@desc Searching for users
//@route GET /api/v1/user/search
//@access private
const searchUsers = asyncHandler(async (req, res) => {

    const searchQuery = req.query.q;

    const users = await User.find({
        username: { $regex: searchQuery }
    }, { username: 1 });

    res.status(200).json({
        status: 'success',
        users
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
    verifyOtp,
    suggestions,
    followUser,
    unfollowUser,
    getFollowersData,
    getFollowingsData,
    sendOtp,
    forgotPassword,
    changePassword,
    editProfile,
    getReadNotifications,
    getUnreadNotifications,
    markAsRead,
    getUserData,
    editProfilePic,
    searchUsers,
}