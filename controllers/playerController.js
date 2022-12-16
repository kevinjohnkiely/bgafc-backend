const Player = require('../models/playerModel');
const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Player.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const players = await features.query;

  res.status(200).json({
    status: 'Success',
    results: players.length,
    data: {
      players: players,
    },
  });
});

exports.createPlayer = catchAsync(async (req, res, next) => {
  const newPlayer = await Player.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      player: newPlayer,
    },
  });
});
