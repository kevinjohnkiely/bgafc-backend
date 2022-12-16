const express = require('express');
const {
  getAllPlayers,
  createPlayer,
  // getPlayer,
  // updatePlayer,
  // deletePlayer,
} = require('../controllers/playerController');
const { loggedInOnly } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(getAllPlayers).post(loggedInOnly, createPlayer);
// router
//   .route('/:slug')
//   .get(getPlayer)
//   .patch(loggedInOnly, updatePlayer)
//   .delete(loggedInOnly, deletePlayer);

module.exports = router;
