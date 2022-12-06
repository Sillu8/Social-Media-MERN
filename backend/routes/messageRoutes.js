const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

const { newMessage, getMessages } = require('../controllers/messageController');

router.post('/', protect, newMessage);
router.get('/:conversationId', protect, getMessages);

module.exports = router;