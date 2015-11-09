var mongoose = require('mongoose');

var accountTypeValidator = function(type) {
  return type === 'participant' || type === 'organizer' || type === 'admin';
};

/* Account model */
var AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  atype: {
    type: String,
    required: true,
    validate: accountTypeValidator
  }
});

AccountSchema.method('verify', function(password, callback) {
  if(this.password === password) {
    callback(null, this);
  } else {
    return callback(null, false);
  }
});

module.exports = mongoose.model('Account', AccountSchema);
