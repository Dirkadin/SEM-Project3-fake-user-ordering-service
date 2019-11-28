var createError = require('http-errors');
var express = require('express');
const axios = require('axios');

var app = express();

const itemsArray = [
    'hotdog',
    'hamburger',
    'soda',
    'cookie'
];

var randomQuantity = getRandomInt(10);
var randomItem = itemsArray[getRandomInt(3)];
var topStatusCode;

let i = 0;
setInterval(() => {
  console.log('Infinite Loop Test interval n:', i++);

  randomQuantity = getRandomInt(10);
  randomItem = itemsArray[getRandomInt(3)];

  console.log('Random Quantity: ' + randomQuantity);
  console.log('Random Item: ' + randomItem);

  //Try order port3000
    const orderStatus = order2();
    console.log(topStatusCode);
  //If fail, update with random number
    console.log('End of loop');
}, 3000);

async function order() {
    const promise = axios.post('http://localhost:3000/purchase/' + randomItem + '/' + randomQuantity, {});
    const response = await promise;
    console.log('Logging response: ' + response);
    topStatusCode = response.body.statusCode;
}

async function order2() {
    const statusCode = axios.post('http://localhost:3000/purchase/' + randomItem + '/' + randomQuantity)
        .then((response) => {
            return response.data.statusCode;
        })
        .catch(function (error) {
            update().then(() => console.log('Updated ' + randomItem));
        });
    return await statusCode;
}

async function update() {
    const promise = axios.post('http://localhost:5002/setcount/' + randomItem + '/' + getRandomInt())
        .catch(function (error) {
            console.log('Error in update: ' + error.message);
        });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
