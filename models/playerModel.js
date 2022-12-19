const mongoose = require('mongoose');
const slugify = require('slugify');

const playerSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: [true, 'A player must have a surname!'],
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, 'A player must have a christian name!'],
    trim: true,
  },
  dateOfBirth: {
    type: String,
  },
  position: {
    type: String,
    required: [true, 'A player must have a position!'],
    trim: true,
  },
  debut: {
    type: String,
    required: [true, 'A player must have a debut!'],
    trim: true,
  },
  firstGoal: String,
  honours: String,
  stats: [[String]],
  slug: {
    type: String,
    unique: true,
  },
});

playerSchema.pre('save', function (next) {
  // check if slug already exists
  this.slug = slugify(`${this.firstName}-${this.lastName}`, {
    lower: true,
  });
  next();
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
