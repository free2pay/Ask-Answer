var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var door = require('./routes/door');
var signin = require('./routes/signin');
var signup = require('./routes/signup');
var question = require('./routes/question');
var newquestion = require('./routes/api/newquestion');
var newanswer = require('./routes/api/newanswer');
var getuserquestion = require('./routes/api/getuserquestion');
var getuseranswer = require('./routes/api/getuseranswer');
var getquestion = require('./routes/api/getquestion');
var getanswers = require('./routes/api/getanswers');
var changescore = require('./routes/api/changescore');
var updateanswer = require('./routes/api/updateanswer');
var getuserinfo = require('./routes/api/getuserinfo');
var gettags = require('./routes/api/gettags');
var useredit = require('./routes/api/useredit');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,('public'))));
app.use(express.static(path.join(__dirname,('routes'))));

app.use('/', door);
app.use('/door',door);
app.use('/signin',signin);
app.use('/signup',signup);
app.use('/question/*',question);
app.use('/api/newquestion',newquestion);
app.use('/api/getuserquestion',getuserquestion);
app.use('/api/getuseranswer',getuseranswer);
app.use('/api/getquestion',getquestion);
app.use('/api/getanswers',getanswers);
app.use('/api/getuserinfo',getuserinfo);
app.use('/api/changescore',changescore);
app.use('/api/newanswer',newanswer);
app.use('/api/updateanswer',updateanswer);
app.use('/api/gettags',gettags);
app.use('/api/useredit',useredit);
app.use('/users/*',users); //个人主页

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
