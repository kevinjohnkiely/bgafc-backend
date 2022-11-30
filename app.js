const express = require('express');
// const fs = require('fs');
const morgan = require('morgan');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1 - MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log('Hello from middleware ***');
  next();
});

// 3 - ROUTES

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
