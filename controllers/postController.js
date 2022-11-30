const fs = require('fs');

const posts = JSON.parse(fs.readFileSync(`${__dirname}/../posts.json`));

exports.checkID = (req, res, next, val) => {
  console.log(`The tour id is - ${val}`);

  if (req.params.id * 1 > posts.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'No tour with that ID!',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Missing title/body',
    });
  }
  next();
};

exports.getAllPosts = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: posts.length,
    data: {
      posts: posts,
    },
  });
};

exports.getPost = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const post = posts.find((el) => el.id === id);

  res.status(200).json({
    status: 'Success',
    data: {
      post: post,
    },
  });
};

exports.createPost = (req, res) => {
  // console.log(req.body)
  const newId = posts[posts.length - 1].id + 1;
  // eslint-disable-next-line prefer-object-spread
  const newPost = Object.assign({ id: newId }, req.body);

  posts.push(newPost);
  fs.writeFile(`${__dirname}/posts.json`, JSON.stringify(posts), () => {
    res.status(201).json({
      status: 'Success',
      data: {
        post: newPost,
      },
    });
  });
};

exports.updatePost = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      post: '<Updated post goes here>',
    },
  });
};

exports.deletePost = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
