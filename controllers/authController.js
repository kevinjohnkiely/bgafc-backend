const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token: token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1 - check if username and password exists
  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }

  // 2 - Check if user exists and password is correct
  const user = await User.findOne({ username: username }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password!', 401));
  }

  // 3 - If all OK, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.loggedInOnly = catchAsync(async (req, res, next) => {
  // 1 - Get the token and check if it exists

  // 2 - Validate the token

  // 3 - Check if user still exists

  // 4 - Check if user changed password after the JWT token was issued

  next();
});
