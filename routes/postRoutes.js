const express = require('express');
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  changePosts,
} = require('../controllers/postController');

const router = express.Router();

// router.param('id', checkID);
router.route('/changePosts').get(changePosts);

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
