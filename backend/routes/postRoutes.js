const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const { allPosts, newPost } = require('../controllers/postController');
const upload = require('../utils/multer');

// router.post('/', protect, upload.single('image'), newPost);
router.route('/',protect)
      .get(allPosts) 
      .post(upload.single('image'), newPost);






module.exports = router;