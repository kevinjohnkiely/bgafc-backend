const dotenv = require('dotenv');
const mongoose = require('mongoose');

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

const app = require('./app');

console.log(process.env.NODE_ENV);

// 4 - START SERVER
const port = process.env.PORT || 1984;
app.listen(port, () => {
  console.log(`App runs on port: ${port}...`);
});
