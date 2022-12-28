const express = require('express');
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getArchivePosts,
  getMonthlyPostTotals,
  changePosts,
} = require('../controllers/postController');
const { loggedInOnly } = require('../controllers/authController');

const router = express.Router();

// Temp route for altering posts
router.route('/changePosts').get(changePosts);

router.route('/').get(getAllPosts).post(loggedInOnly, createPost);
router
  .route('/:slug')
  .get(getPost)
  .patch(loggedInOnly, updatePost)
  .delete(loggedInOnly, deletePost);

// route for post archives
router.route('/archives/:year/:month').get(getArchivePosts);

// route for getting montly post totals
router.route('/g/getMonthlyPostTotals').get(getMonthlyPostTotals);

module.exports = router;
