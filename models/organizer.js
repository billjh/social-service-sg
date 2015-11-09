var mongoose = require('mongoose');

/* Organizer model */
var OrganizerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: String,
  address: String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }
});

module.exports = mongoose.model('Organizer', OrganizerSchema);
