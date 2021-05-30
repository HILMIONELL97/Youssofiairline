require('dotenv').config({ path: './config/.env' });
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const Client = require('./models/client');

const app = express();

const ejsRoutes = require('./routes/ejs.routes');
const authRoutes = require('./routes/auth.routes');

require('./config/db');

const csrfProtection = csrf();

// ejs
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// morgan
process.env.NODE_ENV === 'developpement' && app.use(morgan('tiny'));

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    Client.findOne({ where: { id: req.session.user.id } })
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/', ejsRoutes);
app.use('/', authRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`server running on port : localhost: ${PORT}`);
});