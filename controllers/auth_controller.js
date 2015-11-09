var Account = require('../models/account');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// create local strategy for account authentication
var myStrategy = new LocalStrategy(
  function(email, password, callback) {
    Account.findOne({email: email}, function(err, account) {
      if(err) {return callback(err)};
      if(!account) {return callback(null, false)};
      account.verify(password, callback);
    });
  }
);

exports.passport = passport;

// authentication configuration for express using passport + session
exports.config = function(app) {
  // use my local strategy for authentication
  passport.use(myStrategy);
  // serialize and deserialize users for session persistence
  passport.serializeUser(function(account, callback) {
    callback(null, account.email);
  });
  passport.deserializeUser(function(id, callback) {
    Account.findOne({email: id}, function(err, account) {
      if(err) {return callback(err)};
      callback(null, account)
    });
  });
  app.use(session({ secret: 'guo sikai group', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
};

// factory for account type checking middleware
exports.needType = function(type) {
  return function(req, res, next) {
    if(req.user && req.user.atype === type) {
      next();
    } else {
      res.json({status: 401});
    }
  };
};

/* POST login - success endpoint */
exports.login = function(req, res) {
  console.log('POST login SUCCESS - Account logged in: ' + req.body.username)
  res.json({status: 201});
};

/* GET logout endpoint */
exports.logout = function(req, res) {
  // redirect to main page after session is destroyed
  if(req.isAuthenticated()) {
    console.log('GET logout SUCCESS - Account logged out: ' + req.user.email);
  }
  req.session.destroy(function(err) {
    res.redirect('/');
  });
};
