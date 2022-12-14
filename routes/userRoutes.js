const express = require('express');
// const {
//   getAllUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  loggedInOnly,
  updatePassword,
} = require('../controllers/authController');
const { updateMyAccount } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', loggedInOnly, updatePassword);
router.patch('/updateMyAccount', loggedInOnly, updateMyAccount);

// router.route('/').get(getAllUsers).post(createUser);
// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
