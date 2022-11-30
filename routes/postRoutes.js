const express = require('express');
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  checkBody,
  checkID,
} = require('../controllers/postController');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllPosts).post(checkBody, createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
