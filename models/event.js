var mongoose = require('mongoose');

/* Event model */
var EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizer',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  vacancy: Number,
  description: String,
  phone: String,
  theme: String,
  address: {
    name: String,
    x: Number,
    y: Number
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant'
  }]
});

module.exports = mongoose.model('Event', EventSchema);
