var Account = require('../models/account');
var Organizer = require('../models/organizer');

/*
 * POST organizer API endpoint:
 *   create and save Account and Organizer into database
 */
exports.postOrganizer = function(req, res) {
  var account = new Account({
    email:    req.body.email,
    password: req.body.password,
    atype:    'organizer'
  });
  var organizer = new Organizer({
    email:       req.body.email,
    name:        req.body.name,
    phone:       req.body.phone,
    address:     req.body.address,
    account:     account._id
  });
  account.save(function(err) {
    if(err) {
      res.json({status: 409}); // Conflict
    } else {
      organizer.save(function(err) {
        if(err) {
          Account.findOneAndRemove({
            email: req.body.email
          }, function(){});
          res.json({status: 409}); // Confilct
        } else {
          console.log('SUCCESS - Organizer Account created: ' + req.body.email);
          res.json({status: 201}); // Created
        }
      });
    }
  });
};

/*
 * PUT organizer API endpoint:
 *   update Account and Organizer
 */
exports.putOrganizer = function(req, res) {
  Account.update({email: req.user.email}, {password: req.body.password},
    function(err, msg) {
      if(err)
        return res.json({status: 404});
    });
  Organizer.update({email: req.user.email}, {
    name:    req.body.name,
    phone:   req.body.phone,
    address: req.body.address
  }, function(err, msg) {
    if(err)
      return res.json({status: 404});
  });
  res.json({status: 200});
};
