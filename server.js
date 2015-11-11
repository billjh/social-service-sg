/***************************
 * Setup and configuration *
 ***************************/
  var express = require('express');
  var logger = require('morgan');
  var mongoose = require('mongoose');
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');

  // connect to database
  mongoose.connect(require('./config').db_url);

  // create an express application
  var app = express();

  // use logger
  app.use(logger('dev'));

  // use jade as view engine
  app.set('views', './ui');
  app.set('view engine', 'jade');

  // middleware to parse cookie
  app.use(cookieParser());

  // middleware to parse URLencoded / json requests
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // configure application for authentication
  require('./controllers/auth_controller').config(app);

/***********
 * Routes *
 ***********/
  // webpages and statics files
  app.use('/', require('./routes/ui_router'));
  app.use(express.static('public'));

  // API routes
  app.use('/api', require('./routes/api_router'));


/* Server listens on port */
var port = process.env.PORT || 3000
app.listen(port);
console.log('Social-service-sg server on port ' + port);
