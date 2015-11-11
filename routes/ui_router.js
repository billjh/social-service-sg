var router = require('express').Router();
var UIController = require('../controllers/ui_controller');

/* GET main page */
router.get('/',
  UIController.getMainPage
);

/* GET login page */
router.get('/login',
  UIController.getLoginPage
);

/* GET signup page */
router.get('/signup',
  UIController.getSignupPage
);

/* GET account page */
router.get('/account',
  UIController.getAccountPage
);

/* GET events page */
router.get('/events',
  UIController.getEventsPage
);

/* GET search result page */
router.get('/search',
  UIController.getSearchPage
);

module.exports = router;
