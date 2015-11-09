var Account = require('../models/account');
var Participant = require('../models/participant');

/*
 * POST participant API endpoint:
 *   create and save Account and Participant into database
 */
exports.postParticipant = function(req, res) {
  var account = new Account({
    email:    req.body.email,
    password: req.body.password,
    atype:    'participant'
  });
  var participant = new Participant({
    email:       req.body.email,
    name:        req.body.name,
    phone:       req.body.phone,
    description: req.body.description,
    fields:      req.body.fields,
    account:     account._id
  });
  account.save(function(err) {
    if(err) {
      res.json({status: 409}); // Conflict
    } else {
      participant.save(function(err) {
        if(err) {
          Account.findOneAndRemove({
            email: req.body.email
          }, function(){});
          res.json({status: 409}); // Confilct
        } else {
          console.log('SUCCESS - Participant Account created: ' + req.body.email);
          res.json({status: 201}); // Created
        }
      });
    }
  });
};

/*
 * PUT participant API endpoint:
 *   update Account and Participant
 */
exports.putParticipant = function(req, res) {
  Account.update({email: req.user.email}, {password: req.body.password},
    function(err, msg) {
      if(err)
        return res.json({status: 404});
    });
  Participant.update({email: req.user.email}, {
    name:        req.body.name,
    phone:       req.body.phone,
    description: req.body.description,
    fields:      req.body.fields
  }, function(err, msg) {
    if(err)
      return res.json({status: 404});
  });
  res.json({status: 200});
};
