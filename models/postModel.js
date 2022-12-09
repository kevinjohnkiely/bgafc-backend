const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title!'],
    trim: true,
    maxlength: [40, 'A title cannot be more than 40 characters!'],
    minlength: [5, 'A title must have more than 5 characters!'],
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
    enum: {
      values: ['draft', 'published'],
      message: 'Status has to be either draft or published!',
    },
    // select: false,
  },
  categories: {
    type: [String],
    required: [true, 'A post must have category(ies)!'],
  },
  slug: {
    type: String,
    // required: [true, 'A post must have a slug!'],
    unique: true,
  },
});

// postSchema.virtual('timeSincePost').get(function() {
//   return this.datePublished.
// })

// DOCUMENT MIDDLEWARE - runs before .save() and .create() but NOT .insertMany() !!!
postSchema.pre('save', function (next) {
  // check if slug already exists
  this.slug = slugify(
    `${
      this.title
    }-${this.datePublished.getDay()}-${this.datePublished.getMonth()}-${this.datePublished.getFullYear()}`,
    {
      lowercase: true,
    }
  );
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
