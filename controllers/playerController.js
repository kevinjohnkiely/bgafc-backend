const Player = require('../models/playerModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
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

exports.getPlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findOne({ slug: req.params.slug });

  if (!player) {
    return next(new AppError('No player found with that slug identifier', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      player: player,
    },
  });
});

exports.updatePlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!player) {
    return next(new AppError('No player found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      player: player,
    },
  });
});

exports.deletePlayer = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const player = await Player.findByIdAndDelete(req.params.id);

  if (!player) {
    return next(new AppError('No player found with that ID', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
