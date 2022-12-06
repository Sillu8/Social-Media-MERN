const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

const { getConversation, newConversation, getFriend, } = require('../controllers/conversationController');


router.route('/')
    .get(protect, getConversation)
    .post(protect, newConversation)
router.get('/:friendId', protect, getFriend);

module.exports = router;