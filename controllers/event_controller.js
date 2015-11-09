var Account = require('../models/account');
var Participant = require('../models/participant');
var Organizer = require('../models/organizer');
var Event = require('../models/event');

/*
 * GET event API endpoint:
 *   get event information from database
 */
exports.getEvent = function(req, res) {
  Event.findById(req.query.eid).populate('organizer').exec(function(err, event) {
    if(err || !event || !event.organizer.account.equals(req.user._id))
      return res.json({status: 404});
    res.json({status: 200, event: event});
  });
}

/*
 * POST event API endpoint:
 *   publish a new event
 */
exports.postEvent = function(req, res) {
  var event = new Event({
    title: req.body.title,
    date: new Date(req.body.date),
    vacancy: (req.body.vacancy > 0) ? req.body.vacancy : undefined,
    description: req.body.description,
    phone: req.body.phone,
    theme: req.body.theme,
    address: {name: req.body.address}
  });
  Organizer.findOne({email: req.user.email}, function(err, organizer) {
    if(err || !organizer)
      return res.json({status: 404});
    event.organizer = organizer._id;
    event.save(function(err) {
      if(err)
        return res.json({status: 404});
      res.json({status: 201});
    });
  });
}

/*
 * PUT event API endpoint:
 *   update an event
 */
exports.putEvent = function(req, res) {
  Event.findById(req.body.eid).populate('organizer').exec(function(err, event) {
    if(err || !event || !event.organizer.account.equals(req.user._id))
      return res.json({status: 404});
    Event.findByIdAndUpdate(req.body.eid, {
      title: req.body.event.title,
      date: new Date(req.body.event.date),
      vacancy: (req.body.event.vacancy > 0) ? req.body.event.vacancy : undefined,
      description: req.body.event.description,
      phone: req.body.event.phone,
      theme: req.body.event.theme,
      address: {name: req.body.event.address}
    }, function(err) {
      if(err)
        return res.json({statsu: 404});
      res.json({status: 200});
    });
  });
}

/*
 * DELETE event API endpoint:
 *   delete an event from database
 */
exports.deleteEvent = function(req, res) {
  Event.findById(req.body.eid).populate('organizer').exec(function(err, event) {
    if(err || !event || !event.organizer.account.equals(req.user._id))
      return res.json({status: 404});
    Event.findByIdAndRemove(req.body.eid, function(err) {
      if(err)
        return res.json({status: 404});
      res.json({status: 200});
    });
  });
}

/*
 * POST join API endpoint:
 *   add participant id into event's list
 */
exports.postJoin = function(req, res) {
  Participant.findOne({email: req.user.email}, function(err, participant) {
    if(err || !participant || !req.body || !req.body.eid) {
      return res.json({status: 404});
    }
    Event.findById(req.body.eid, function(err, event) {
      if(event.participants.indexOf(participant._id) == -1) {
        event.participants.push(participant._id);
        event.save();
      }
      res.json({status: 201});
    });
  });
};

/*
 * DELETE join API endpoint:
 *   delete participant id from event's list
 */
exports.deleteJoin = function(req, res) {
  Participant.findOne({email: req.user.email}, function(err, participant) {
    if(err || !participant || !req.body || !req.body.eid) {
      return res.json({status: 404});
    }
    Event.findById(req.body.eid, function(err, event) {
      var index = event.participants.indexOf(participant._id);
      if(index > -1) {
        event.participants.splice(index, 1);
        event.save();
      }
      res.json({status: 200});
    });
  });
};
