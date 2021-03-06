var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');
var documentsRouter = require('./routes/documents');
var billsRouter = require('./routes/bills');
var dormsRouter = require('./routes/dorms');
var failuresRouter = require('./routes/failures');
var floorsRouter = require('./routes/floors');
var reservationsRouter = require('./routes/reservations');
var roomsRouter = require('./routes/rooms');
var warningsRouter = require('./routes/warnings');
var paymentsRouter = require('./routes/payments');
var scheduler = require('./jobs/schedule');

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
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);
app.use('/documents', documentsRouter);
app.use('/bills', billsRouter);
app.use('/dorms', dormsRouter);
app.use('/failures', failuresRouter);
app.use('/floors', floorsRouter);
app.use('/reservations', reservationsRouter);
app.use('/rooms', roomsRouter);
app.use('/warnings', warningsRouter);
app.use('/payments', paymentsRouter);
app.use('/schedule', scheduler);

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
