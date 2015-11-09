var mongoose = require('mongoose');

/* Participant model */
var ParticipantSchema = new mongoose.Schema({
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
  description: String,
  fields: {
    children: Boolean,
    family: Boolean,
    disability: Boolean,
    mental: Boolean,
    eldercare: Boolean
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
