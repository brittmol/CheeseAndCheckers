const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const {sessionSecret} = require('./config')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { restoreUser } = require('./auth')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const boardgamesRouter = require('./routes/boardgames')
const gameshelvesRouter = require('./routes/gameshelves')
const aboutRouter = require('./routes/about')

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boardgames', boardgamesRouter)
app.use('/gameshelves', gameshelvesRouter)
app.use('/about', aboutRouter)

// ---------- ERROR HANDLERS ---------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// -------------- for reference ---------------

// // Catch unhandled requests and forward to error handler.
// app.use((req, res, next) => {
//   const err = new Error('The requested page couldn\'t be found.');
//   err.status = 404;
//   next(err);
// });

// // Custom error handlers.

// // Error handler to log errors.
// app.use((err, req, res, next) => {
//   if (process.env.NODE_ENV === 'production') {
//     // TODO Log the error to the database.
//   } else {
//     console.error(err);
//   }
//   next(err);
// });

// // Error handler for 404 errors.
// app.use((err, req, res, next) => {
//   if (err.status === 404) {
//     res.status(404);
//     res.render('page-not-found', {
//       title: 'Page Not Found',
//     });
//   } else {
//     next(err);
//   }
// });

// // Generic error handler.
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   const isProduction = process.env.NODE_ENV === 'production';
//   res.render('error', {
//     title: 'Server Error',
//     message: isProduction ? null : err.message,
//     stack: isProduction ? null : err.stack,
//   });
// });

module.exports = app;
