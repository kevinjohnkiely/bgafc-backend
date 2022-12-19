const express = require('express');
const {
  getAllPlayers,
  createPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playerController');
const { loggedInOnly } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(loggedInOnly, getAllPlayers)
  .post(loggedInOnly, createPlayer);
router.route('/:slug').get(getPlayer);
router
  .route('/:id')
  .patch(loggedInOnly, updatePlayer)
  .delete(loggedInOnly, deletePlayer);

module.exports = router;
