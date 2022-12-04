const express = require('express');
const router = express.Router();

const { getUser, login, signup, suggestions, followUser, unfollowUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


router.route('/').get(protect, getUser);
router.post('/signup',signup);
router.post('/login',login);
router.get('/suggestions', protect, suggestions);
router.patch('/follow', protect, followUser);
router.patch('/unfollow', protect, unfollowUser);








module.exports = router;