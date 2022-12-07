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

const router = express.Router();

// router.param('id', checkID);
router.route('/changePosts').get(changePosts);

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

// route for post archives
router.route('/archives/:year/:month').get(getArchivePosts);

// route for getting montly post totals
router.route('/g/getMonthlyPostTotals').get(getMonthlyPostTotals);

module.exports = router;
