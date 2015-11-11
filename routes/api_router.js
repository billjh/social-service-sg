var router = require('express').Router();
var participantController = require('../controllers/participant_controller');
var organizerController = require('../controllers/organizer_controller');
var authController = require('../controllers/auth_controller');
var eventController = require('../controllers/event_controller');
var onemapController = require('../controllers/onemap_controller');

/*
 * POST login API: login Account
 */
router.post('/login',
  authController.passport.authenticate('local'),
  authController.login
);

/*
 * GET logout API: logout from current session
 */
router.get('/logout',
  authController.logout
);

/*
 * POST particpant API: signup Participant Account
 */
router.post('/participant',
  participantController.postParticipant
);

/*
 * PUT participant API: update Participant Account
 */
router.put('/participant',
  authController.needType('participant'),
  participantController.putParticipant
);

/*
 * POST organizer API: create Organizer Account
 */
router.post('/organizer',
  authController.needType('admin'),
  organizerController.postOrganizer
);

/*
 * PUT organizer API: update Organizer Account
 */
router.put('/organizer',
  authController.needType('organizer'),
  organizerController.putOrganizer
);

/*
 * GET event API: get information of an event
 */
router.get('/event',
  authController.needType('organizer'),
  eventController.getEvent
);

/*
 * POST event API: publish an event
 */
router.post('/event',
  authController.needType('organizer'),
  eventController.postEvent
);

/*
 * PUT event API: edit an event
 */
router.put('/event',
  authController.needType('organizer'),
  eventController.putEvent
);

/*
 * DELETE event API: cancel and event
 */
router.delete('/event',
  authController.needType('organizer'),
  eventController.deleteEvent
);

/*
 * POST join API: a participant join an event
 */
router.post('/join',
  authController.needType('participant'),
  eventController.postJoin
);

/*
 * DELETE join API: a participant withdraw from an event
 */
router.delete('/join',
  eventController.deleteJoin
);

/*
 * GET address search API:
 *   address search by a string
 */
router.get('/address-search',
  onemapController.getAddressSearch
);

module.exports = router;
