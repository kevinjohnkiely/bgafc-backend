const fs = require('fs');

const postsOriginal = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/posts-changed-4.json`)
);
// const slicedPosts = postsOriginal.slice(0, 100);
const newPosts = postsOriginal.map((el) => {
  el.status = 'Published';
  // if its an array do this
  // if (Array.isArray(el.categories)) {
  //   for (let x = 0; x < el.categories.length; x++) {
  //     el.categories[x] = el.categories[x].nicename;
  // console.log('it is', el.categories[x].nicename);
  // }
  // else if object do this
  // } else {
  //   el.categories = [el.categories.nicename];
  // }

  return el;
});
// console.log(newPosts);
// fs.writeFile(
//   `${__dirname}/../dev-data/posts-changed-1.json`,
//   JSON.stringify(newPosts),
//   (err) => {
//     console.log(err);
//   }
// );
///////////////////////////

const Post = require('../models/postModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.changePosts = async (req, res) => {
  try {
    fs.writeFile(
      `${__dirname}/../dev-data/posts-changed-5.json`,
      JSON.stringify(newPosts),
      (err) => {
        console.log(err);
      }
    );
    res.status(200).json({
      status: 'Success',
      results: newPosts.length,
      data: {
        posts: newPosts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const posts = await features.query;

  res.status(200).json({
    status: 'Success',
    results: posts.length,
    data: {
      posts: posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  // const post = await Post.findById(req.params.id);
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      post: post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      post: newPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      post: post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.getArchivePosts = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const month = req.params.month * 1;

  console.log(year, month);

  const posts = await Post.aggregate([
    {
      $match: {
        datePublished: {
          $gte: new Date(`${year}-${month}-01`),
          $lte: new Date(`${year}-${month}-31T23:59:59.000Z`),
        },
      },
    },
    {
      $sort: {
        datePublished: -1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      posts: posts,
      amountOfPosts: posts.length,
    },
  });
});

exports.getMonthlyPostTotals = catchAsync(async (req, res, next) => {
  const totals = await Post.aggregate([
    {
      $group: {
        _id: {
          the_year: { $year: '$datePublished' },
          the_month: { $month: '$datePublished' },
        },
        // _id: { $month: '$datePublished' },
        numPostsByMOnth: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      totals: totals,
    },
  });
});
