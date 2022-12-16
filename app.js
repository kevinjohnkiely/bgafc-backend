const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const playerRouter = require('./routes/playerRoutes');

const app = express();

// 1 - GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// LImit request from same API
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many requests from this IP address! Please try again in an hour.',
});
app.use('/api', limiter);

// Body parser, reading from body into req.body
app.use(express.json());
// app.use(express.json({ limit: '10kb' }));

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross side scripting) attacks
app.use(xss());

// Prevent paramter pollution
app.use(hpp());
// app.use(hpp({
//   whitelist: [
//     'xxxx'
//   ]
// }));

// app.use(express.static(`${__dirname}/public`))

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/players', playerRouter);

app.all('*', (req, res, next) => {
  // if Next gets argument, its automatically an ERROR and will skip ALL other middlewares
  // and go straight to globale error handling middleware and be executed
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// With the 4 args - express sees this as error middleware, and only call when error //
app.use(globalErrorHandler);

module.exports = app;
