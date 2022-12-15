const express = require('express');
const router = express.Router();

const { getUser, login, signup, suggestions, followUser, unfollowUser, getFollowersData, getFollowingsData, verifyOtp } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


router.route('/').get(protect, getUser);
router.post('/signup',signup);
router.post('/verify',verifyOtp);
router.post('/login',login);
router.get('/suggestions', protect, suggestions);
router.patch('/follow', protect, followUser);
router.patch('/unfollow', protect, unfollowUser);
router.get('/followers/:id',getFollowersData);
router.get('/followings/:id',getFollowingsData);








module.exports = router;