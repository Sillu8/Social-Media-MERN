const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const {
      allPosts,
      newPost,
      userPosts,
      likePost,
      savePost,
      addComment,
      unlikePost,
      userSavedPosts,
      reportPost,
      deletePost,
      getSinglePost,
      editPost
} = require('../controllers/postController');
const upload = require('../utils/multer');

router.route('/')
      .get(protect, allPosts)
      .post(protect, upload.single('image'), newPost)
      .delete(protect, deletePost)

router.route('/userposts/:username')
      .get(protect, userPosts);
router.get('/savedPosts/:username', protect, userSavedPosts);


router.patch('/:id/like', protect, likePost);
router.patch('/:id/unlike', protect, unlikePost);
router.patch('/:id/save', protect, savePost);
router.patch('/:id/comment', protect, addComment);
router.patch('/:postId/report', protect, reportPost)
router.get('/data/:postId', protect, getSinglePost)
router.patch('/:postId/edit', editPost)


module.exports = router;