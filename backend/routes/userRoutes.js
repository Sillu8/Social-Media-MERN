const express = require('express');
const router = express.Router();

const { getUser, login, signup, suggestions } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


router.route('/').get(protect, getUser);
router.post('/signup',signup);
router.post('/login',login);
router.get('/suggestions', protect, suggestions);








module.exports = router;