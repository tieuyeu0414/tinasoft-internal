var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./src/database/base/mysql');
require('./src/database/staff')
require('./src/database/bonus_salary')
require('./src/database/days_allowed_leave')
require('./src/database/deduction_day_off')
require('./src/database/deduction_hour_late')
require('./src/database/event')
require('./src/database/letter_leave')
require('./src/database/onsite_salary')
require('./src/database/overtime_salary')
require('./src/database/project_salary')
require('./src/database/total_salary_month')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./src/routes/index');
app.use('/api/v1', routes)


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
