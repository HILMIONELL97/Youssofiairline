const bcrypt = require('bcrypt');
// const passport = require('passport');

const Client = require('../models/client');
const {
  RegisterValidations,
  loginValidation,
} = require('../validations/auth.validations');

/* ! @Route  : GET => /register
     Desc    : render the register page 
     @Access : Pubic
*/
exports.getRegister = (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/validation');
  }
  res.render('register', {
    data: req.doby,
    err: '',
    ifLog: req.session.user || '',
  });
};

/* ! @Route  : POST => /register
     Desc    : render the register page 
     @Access : Pubic
*/

exports.postRegister = async (req, res) => {
  const ifMail = await Client.findOne({ where: { email: req.body.email } });
  if (ifMail) {
    res.render('register', {
      err: 'adress mail deja existante veiller vous connecter',
      data: req.body,
    });
  }
  const { error } = RegisterValidations(req.body);
  error && res.render('register', { err: error, data: req.body });
  const registerClient = new Client({
    ...req.body,
  });
  const salt = await bcrypt.genSalt(10);
  const hashdPassword = await bcrypt.hash(req.body.password, salt);
  registerClient.password = hashdPassword;
  try {
    if (!ifMail && !error) {
      // console.log(req.session);
      const addClient = await registerClient.save();
      req.flash('success_msg', 'You are now registered and can log in');
      addClient && res.redirect('login');
    }
  } catch (err) {
    res.render('404');
  }
};

/* ! @Route  : GET => /register
     Desc    : render the register page 
     @Access : Pubic
*/
exports.getLogin = (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/validation');
  }
  res.render('login', { err: '', ifLog: req.session.user || '' });
};

/* ! @Route  : POST => /register
     Desc    : render the register page 
     @Access : Pubic
*/

exports.postLogin = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    error && res.render('login', { err: error });
    // verification if mail exist
    const client = await Client.findOne({ where: { email: req.body.email } });
    if (!client) {
      res.render('login', { err: 'email ou mots de pass incorrect' });
    }
    // verif password
    bcrypt.compare(req.body.password, client.password, (err, data) => {
      if (!err) {
        req.session.isLoggedIn = true;
        req.session.user = client;
        return req.session.save((err) => {
          !err
            ? res.redirect('validation')
            : console.log(`errredirect mablanch ${err}`);
        });
      }
      res.render('login', { err: 'email ou mots de pass incorrect' });
    });
  } catch (error) {
    res.render('index');
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
