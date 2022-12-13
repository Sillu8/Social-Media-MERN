const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const { allPosts, newPost, userPosts, likePost, savePost, addComment, unlikePost, userSavedPosts } = require('../controllers/postController');
const upload = require('../utils/multer');

// router.post('/', protect, upload.single('image'), newPost);
router.route('/')
      .get( protect, allPosts) 
      .post( protect, upload.single('image'), newPost);

router.route('/userposts')
      .get(protect, userPosts);
router.get('/savedPosts',protect,userSavedPosts)

router.patch('/:id/like', protect, likePost);
router.patch('/:id/unlike', protect, unlikePost);
router.patch('/:id/save', protect, savePost);
router.patch('/:id/comment', protect, addComment);


module.exports = router;