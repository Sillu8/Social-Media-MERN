const express = require('express');
const router = express.Router();

const { getUser,
    login,
    signup,
    suggestions,
    followUser,
    unfollowUser,
    markAsRead,
    getFollowersData,
    getFollowingsData,
    verifyOtp,
    sendOtp,
    forgotPassword,
    changePassword,
    editProfile,
    getUnreadNotifications,
    getReadNotifications,
    getUserData,
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');


router.route('/').get(protect, getUser).put(protect, editProfile);
router.post('/signup', signup);
router.post('/verify', verifyOtp);
router.post('/login', login);
router.get('/suggestions', protect, suggestions);
router.patch('/follow', protect, followUser);
router.patch('/unfollow', protect, unfollowUser);
router.get('/followers/:username', getFollowersData);
router.get('/followings/:username', getFollowingsData);
router.patch('/sendOtp', sendOtp);
router.patch('/forgotPassword', forgotPassword);
router.patch('/changePassword', changePassword);
router.get('/notifications/unseen/:userId', protect, getUnreadNotifications);
router.get('/notifications/seen/:userId', protect, getReadNotifications);
router.patch('/notification/:id', protect, markAsRead)
router.get('/:username', getUserData)









module.exports = router;