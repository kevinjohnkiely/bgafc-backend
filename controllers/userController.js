const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'Success',
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is undefined',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is undefined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is undefined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is undefined',
  });
};
