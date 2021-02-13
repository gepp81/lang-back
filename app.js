var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var langsRouter = require('./routes/langs');
var tipsRouter = require('./routes/tips');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

var mongoConfig = {
  user: process.env.MONGO_USER || 'user',
  pass: process.env.MONGO_PASS || 'pass',
  cluster: process.env.MONGO_CLUSTER || 'cluster',
  db: process.env.MONGO_DB || 'tips'
};

var connectionString =  'mongodb+srv://' + mongoConfig.user + ':' + mongoConfig.pass + '@' 
  + mongoConfig.cluster + '/' + mongoConfig.db + '?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connnection successful!')
  })
  .catch(err => console.log(err));

app.use('/langs', langsRouter);
app.use('/tips', tipsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
