const express = require('express');
const router = express.Router();

const { newAdmin, adminLogin, adminData, getUsersData, changeUserStatus, } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, adminData)
    .post(newAdmin);

router.post('/login', adminLogin);
router.get('/users', protect, getUsersData);
router.patch('/:userId/block', protect, changeUserStatus)



module.exports = router;