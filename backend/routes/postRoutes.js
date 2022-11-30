const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const { allPosts, newPost, userPosts, likePost, savePost } = require('../controllers/postController');
const upload = require('../utils/multer');

// router.post('/', protect, upload.single('image'), newPost);
router.route('/')
      .get( protect, allPosts) 
      .post( protect, upload.single('image'), newPost);

router.route('/userposts')
      .get(protect, userPosts);

router.patch('/:id/like', protect, likePost);
router.patch('/:id/save', protect, savePost);


module.exports = router;