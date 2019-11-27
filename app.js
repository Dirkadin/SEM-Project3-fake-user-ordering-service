var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const itemsArray = [
    'hotdog',
    'hamburger',
    'soda',
    'cookie'
];

let i = 0;
setInterval(() => {
  console.log('Infinite Loop Test interval n:', i++);
  var randomQuantity = getRandomInt(10);
  //Rand item

  var randomItem = itemsArray[getRandomInt(3)];
  //Try order port3000
    axios.post('http://localhost:3000/purchase/' + randomItem + randomQuantity, {
    })
        .then(function (response) {
            if (response.body.statusCode === 202) {
                console.log("You ordered " + randomQuantity + " " + randomItem);
            } else {

            }
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

  //If fail, update with random number

}, 2000);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function order() {
    const promise = axios.post('http://localhost:3000/purchase/' + randomItem + randomQuantity, {});
    const response = await promise;
    return response.body.statusCode;
}

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
