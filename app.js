const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`))

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // if Next gets argument, its automatically an ERROR and will skip ALL other middlewares
  // and go straight to globale error handling middleware and be executed
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// With the 4 args - express sees this as error middleware, and only call when error //
app.use(globalErrorHandler);

module.exports = app;
