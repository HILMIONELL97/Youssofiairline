const express = require('express');

const router = express.Router();
const {
  getRegister,
  postRegister,
  postLogin,
  getLogin,
  logout,
} = require('../controllers/auth.controller');

/* ! @Route  : GET => /register
     Desc    : render the register page 
     @Access : Pubic
*/
router.get('/register', getRegister);

/* ! @Route  : POST => /register
     Desc    : Register a user in the db
     @Access : Pubic
*/
router.post('/register', postRegister);

/* ! @Route  : GET => /login
     Desc    : render the login page 
     @Access : Pubic
*/
router.get('/login', getLogin);

/* ! @Route  : POST => /login
     Desc    : log a user 
     @Access : Pubic
*/
router.post('/login', postLogin);

/* ! @Route  : GET => /login
     Desc    : log a user 
     @Access : Pubic
*/
router.get('/logout', logout);

module.exports = router;
