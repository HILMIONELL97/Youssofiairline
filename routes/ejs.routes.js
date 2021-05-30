const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const {
  pageAccueil,
  searchOffres,
  singleoffre,
  validation,
  payment,
} = require('../controllers/ejs.controllers');

/* ! @Route  : GET => /
     Desc    : render to home page
     @Access : Pubic
*/
router.get('/', pageAccueil);

/* ! @Route  : GET => /offers
     Desc    : render all offers whide conditions
     @Access : Pubic
*/
router.post('/offers', searchOffres);

/* ! @Route  : GET => /offer/:idoffre
     Desc    : render single offre 
     @Access : Pubic
*/
router.get('/offre/:id', singleoffre);

/* ! @Route  : GET => /validation
     Desc    : render offre + user informations
     @Access : private
*/
router.get('/validation', isAuth, validation);

/* ! @Route  : GET => /payment
     Desc    : render offre + user informations
     @Access : private
*/
router.get('/payment', isAuth, payment);

module.exports = router;
