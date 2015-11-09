var router = require('express').Router();
var webpageController = require('../controllers/webpage_controller');

/* GET main page */
router.get('/',
  webpageController.getMainPage
);

/* GET login page */
router.get('/login',
  webpageController.getLoginPage
);

/* GET signup page */
router.get('/signup',
  webpageController.getSignupPage
);

/* GET account page */
router.get('/account',
  webpageController.getAccountPage
);

/* GET events page */
router.get('/events',
  webpageController.getEventsPage
);

module.exports = router;
