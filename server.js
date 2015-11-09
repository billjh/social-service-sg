/***************************
 * Setup and configuration *
 ***************************/
  var express = require('express');
  var logger = require('morgan');
  var mongoose = require('mongoose');
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');

  // connect to database
  var db_url = 'mongodb://localhost/test'
  mongoose.connect(db_url);

  // create an express application
  var app = express();

  // use logger
  app.use(logger('dev'));

  // use jade as view engine
  app.set('views', './webpages');
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
  app.use('/', require('./routes/webpage_router'));

  // API routes and static files
  app.use('/api', require('./routes/api_router'));
  app.use(express.static('public'));


/* Server listens on port */
var port = process.env.PORT || 3000
app.listen(port);
console.log('Social-service-sg server on port ' + port);
