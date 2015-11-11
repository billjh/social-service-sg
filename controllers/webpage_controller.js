var router = require('express').Router();
var Event = require('../models/event');
var Participant = require('../models/participant');
var Organizer = require('../models/organizer');

/*
 * GET main page render
 */
exports.getMainPage = function(req, res) {
  if(req.isAuthenticated()) {
    // render main page for participant logged in
    if(req.user.atype === 'participant') {
      Event.find({}).sort('date').populate('organizer').exec(function(err, events) {
        // need to get participant's name
        Participant.findOne({email: req.user.email}, function(err, participant) {
          return res.render('main', {
            events: events,
            participant: participant
          });
        });
      });
    }
    // render organizer's main page
    if(req.user.atype === 'organizer') {
      Organizer.findOne({email: req.user.email}, function(err, organizer) {
        return res.render('main_organizer', {organizer: organizer});
      });
    }
    // render admin's main page
    if(req.user.atype === 'admin') {
      return res.render('main_admin');
    }
  // render main page for visitor
  } else {
    return Event.find({}).sort('date').populate('organizer').exec(function(err, events) {
      res.render('main', {events: events});
    });
  }
};

/*
 * GET login page render
 */
exports.getLoginPage = function(req, res) {
  // redirect to main page if already logged in
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login');}
};

/*
 * GET signup page render
 */
exports.getSignupPage = function(req, res) {
  // redirect to main page if already logged in
  if(!req.isAuthenticated()) {
    res.render('signup');
  } else {
    res.redirect('/');}
};

/*
 * GET account page render
 */
exports.getAccountPage = function(req, res) {
  if(req.isAuthenticated()) {
    if(req.user.atype === 'participant') {
      return Participant.findOne({email: req.user.email}).populate('account').exec(function(err, participant) {
        res.render('account_participant', {participant: participant});
      });
    }
    if(req.user.atype === 'organizer') {
      return Organizer.findOne({email: req.user.email}).populate('account').exec(function(err, organizer) {
        res.render('account_organizer', {organizer: organizer});
      });
    }
  }
  // redirect to main page for visitors and admin
  res.redirect('/');
};

/*
 * GET events page render
 */
exports.getEventsPage = function(req, res) {
  if(req.isAuthenticated()) {
    if(req.user.atype === 'participant') {
      // query participant
      return Participant.findOne({email: req.user.email}, function(err, participant) {
        if(err || !participant)
          res.redirect('/');
        else
          // query all events that the participant has joined
          Event.find({participants: participant._id}).sort('date').populate('organizer').exec(function(err, events) {
            if(err || !events)
              res.redirect('/');
            else
              res.render('events_participant', {
                events: events,
                participant: participant
              });
          });
      });
    }
    if(req.user.atype === 'organizer') {
      // query organizer
      return Organizer.findOne({email: req.user.email}, function(err, organizer) {
        if(err || !organizer)
          res.redirect('/');
        else
          // query all events published by the organizer
          Event.find({organizer: organizer._id}).populate('participants').exec(function(err, events) {
            if(err || !events)
              res.redirect('/');
            else
              res.render('events_organizer', {
                events: events,
                organizer: organizer
              });
          });
      });
    }
  }
  // redirect to main page for visitors and admin
  res.redirect('/');
};

/*
 * GET search page render
 */
exports.getSearchPage = function(req, res) {
  // http://www.spatialreference.org/ref/epsg/svy21-singapore-tm/
  var range = 5000;
  // redirect to main page for admin and organizer
  if(req.isAuthenticated() && (req.user.atype === 'organzier' || req.user.atype === 'admin')) {
    return res.redirect('/');
  }
  Event.find()
    .where('address.x').gt(req.query.x - range).lt(req.query.x + range)
    .where('address.y').gt(req.query.y - range).lt(req.query.y + range)
    .populate('organizer').exec(function(err, events) {
      if(err) return res.redirect('/');
      res.render('search', {
        query: req.query,
        events: events
      });
    });
}
