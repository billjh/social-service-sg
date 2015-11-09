// to clear database, use mongo shell
// $ mongo
// > db.dropDatabase()

var mongoose = require('mongoose');
var db_url = 'mongodb://localhost/test';
mongoose.connect(db_url);

var Account = require('./models/account');
var Participant = require('./models/participant');
var Organizer = require('./models/organizer');
var Event = require('./models/event');

/* admin */
var admin = new Account({
  email: 'admin@ss.sg',
  password: 'adminadmin',
  atype: 'admin'
});
admin.save()

/* participants */
// bob
var bob = new Account({
  email: 'bob@ss.sg',
  password: 'hellobob',
  atype: 'participant'
});
var bob_info = new Participant({
  email: 'bob@ss.sg',
  name: 'Bob',
  description: 'I am a little shy but I am happy to help people.',
  account: bob._id
});
bob.save();
bob_info.save();

// kevin
var kevin = new Account({
  email: 'kevin@ss.sg',
  password: 'hellokevin',
  atype: 'participant'
});
var kevin_info = new Participant({
  email: 'kevin@ss.sg',
  name: 'Kevin',
  description: 'I am happy to help people!',
  account: kevin._id
});
kevin.save();
kevin_info.save();

// stuart
var stuart = new Account({
  email: 'stuart@ss.sg',
  password: 'hellostuart',
  atype: 'participant'
});
var stuart_info = new Participant({
  email: 'stuart@ss.sg',
  name: 'Stuart',
  description: 'I am willing to help people.',
  account: stuart._id
});
stuart.save();
stuart_info.save();

/* Organizers */
// Care Corner Family Service Center
var carecorner = new Account({
  email: 'carecorner@ss.sg',
  password: 'carecorner',
  atype: 'organizer'
});
var carecorner_info = new Organizer({
  email: 'carecorner@ss.sg',
  name: 'Care Corner Family Service Center (Admiralty)',
  phone: '63658751',
  address: 'Blk 718 Woodlands Ave 6, #01-658 Singapore 730718',
  account: carecorner._id
});
carecorner.save();
carecorner_info.save();

// Singapore Association for the Deaf
var sadeaf = new Account({
  email: 'sadeaf@ss.sg',
  password: 'sadeaf',
  atype: 'organizer'
});
var sadeaf_info = new Organizer({
  email: 'sadeaf@ss.sg',
  name: 'Singapore Association for the Deaf',
  address: '227 Mountbatten Road, Singapore 397998',
  account: sadeaf._id
});
sadeaf.save();
sadeaf_info.save();

/* Events */
// CCFSC Counselling Service
var ccfsc_cs = new Event({
  title: 'Single Family Support Program',
  organizer: carecorner_info._id,
  date: new Date('2016-01-12'),
  vacancy: 15,
  description: 'Circle of Care • Child Services is organizing a Single-Parent Program to promote the psycho-emotional wellbeing of single parent families towards stability, growth and acceptance of the new family unit. It is a half-day program to visit the homes of the single-parent families. \nVolunteers are needed to visit the families together with the staff of the service centre on the event day. \nCircle of Care • Child Services is one of the Family Service Centres in Singapore, concerned with the wellbeing of children in Singapore. Volunteers can gain experience of showing care for single families and helping to prepare for voluntary events. 15 families will be visited on event day.',
  theme: 'Family',
  address: {
    name: carecorner_info.address
  },
  participants: [
    bob_info._id
  ]
});
ccfsc_cs.save();

// Care Corner Special Day Care for Elderly
var cc_sdcfe = new Event({
  title: 'Care Corner Special Day Care for Elderly',
  organizer: carecorner_info._id,
  date: new Date('2016-01-13'),
  vacancy: 15,
  description: 'Care Corner SDC supports the needs of busy families who are unable to care for their elderly family members while they are at work. Through a warm, caring and safe home-like environment, we keep our seniors mentally, physically and socially healthy. \nVolunteers are needed for to help caregivers to take care of the elderlies for a whole day, in the Day Care centre.',
  phone: '62536979',
  theme: 'Eldercare',
  address: {
    name: 'Blk 235 Lor 8 Toa Payoh, #01-100 Singapore 310235'
  },
  participants: [
    bob_info._id,
    kevin_info._id
  ]
});
cc_sdcfe.save();

// SADeaf Flag Day
var sadeaf_fd = new Event({
  title: 'SADeaf Flag Day',
  organizer: sadeaf_info._id,
  date: new Date('2015-12-3'),
  description: 'SADeaf Flag Day is one of the major fundraising efforts for Singapore Association for the Deaf to support essential services for the Deaf and hard-of-hearing community. These include sign language interpretation service; note-taking; support for students with hearing loss; and audiology services. \nThe Singapore Association for the Deaf (SADeaf) facilitates communications of persons with hearing impairment with the community for educational, employment, legal and recreational purposes. SADeaf Community Services also provide counselling and case management to persons with hearing impairment via specialised mode of communication.',
  theme: 'Disability',
  address: {
    name: 'SADeaf HQ at Mountbatten'
  },
  participants: [
    bob_info._id,
    stuart_info._id
  ]
});
sadeaf_fd.save();


console.log('Done populating to database. ');
