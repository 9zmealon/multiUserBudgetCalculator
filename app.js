var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//=========================================
var session = require("express-session");
var passport = require('passport');
//=========================================

var indexRouter = require('./routes/homepage');
var idxRouter = require('./routes/index');
var incRouter = require('./routes/incomeMongo');
//-------------------------------------------------------------------------------------------------------
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var incomeRouter = require('./routes/income');
var expensesRouter = require('./routes/expenses');
//-------------------------------------------------------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//==========================================================================================================
app.use(session({
  secret: 'login',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//===
var connection = require('./lib/dbConnection');//-------For DB connection
passport.serializeUser(function (user, done) {//-------passport Sereialize
  done(null, user[0].uid);
});


passport.deserializeUser(function (uid, done) {//-------passport Deserialize
  connection.query("SELECT * from users WHERE uid = ?", uid, function (err, user) {
    if (err) throw err;
    done(err, user[0]);
  });
});
//============================================================================================================






app.use('/', indexRouter);
app.use('/index', idxRouter);

app.use('/inc', incRouter);

//-----------------------------------------------------------
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expensesRouter);
//-----------------------------------------------------------














// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
