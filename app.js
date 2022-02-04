var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var addBookRouter = require('./routes/addbook');
var viewBookRouter = require('./routes/bookview');
var addCustomerRouter = require('./routes/addcustomer')
var viewCustomerRouter = require('./routes/viewcustomer')
var loansRouter = require('./routes/loans')

var app = express();

global.conn = require('./dbconnection/dbconnect');

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to Database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json({
  limit: '10000000000000mb'
}));
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/addbook', addBookRouter);
app.use('/bookview', viewBookRouter);
app.use('/addcustomer', addCustomerRouter);
app.use('/viewcustomer', viewCustomerRouter);
app.use('/loans', loansRouter)


module.exports = app;