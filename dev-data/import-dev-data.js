const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Post = require('../models/postModel');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// READ THE JSON FILE
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/posts-changed-5.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Post.create(posts);
    console.log('Data was loaded into DB!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DB DATA FROM COLLECTION!
const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log('Data was wiped from the DB!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
