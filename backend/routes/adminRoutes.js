const express = require('express');
const router = express.Router();

const { newAdmin, adminLogin, adminData, getUsersData, removeReport, getReportedPosts, changeUserStatus, } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, adminData)
    .post(newAdmin);

router.post('/login', adminLogin);
router.get('/users', protect, getUsersData);
router.get('/posts/report', protect, getReportedPosts);
router.patch('/:userId/block', protect, changeUserStatus);
router.patch('/:postId/report', removeReport)



module.exports = router;