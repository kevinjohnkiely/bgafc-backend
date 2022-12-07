const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title!'],
  },
  body: {
    type: String,
    required: [true, 'A post must have a text body!'],
  },
  datePublished: {
    type: Date,
    // date needs to be formatted to YYYY-MM-DD HH:MM:SS
    default: Date.now(),
    required: [true, 'A post must have a date!'],
  },
  status: {
    type: String,
    required: [true, 'A post must have a text Status!'],
    // select: false,
  },
  categories: {
    type: [String],
  },
  slug: {
    type: String,
    required: [true, 'A post must have a slug!'],
    unique: true,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
