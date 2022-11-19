const express = require('express');
const router = express.Router();

const { getUser, login, signup } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


router.route('/').get(protect, getUser)
router.post('/signup',signup);
router.post('/login',login);








module.exports = router;