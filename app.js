var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var trailsRouter = require('./routes/trails');
const mongoose = require('mongoose');
var app = express();
// Create instance of Mongoose and connect to our local
// MongoDB database at the directory specified earilier.

mongoose.connect('mongodb://localhost/inMotion');

// Tell Mongoose to use ES6 Promises for its promises
mongoose.Promise = global.Promise;

// Log to console any errors or a successful connection.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to db at /inMotion")
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/trails', trailsRouter);

module.exports = app;
