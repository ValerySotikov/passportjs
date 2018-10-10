const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const login = require('../routes/login');
const signup = require('../routes/signup');
const home = require('../routes/home');
const flash = require('connect-flash');
const logout = require('../routes/logout');

module.exports = app => {
  app.use(express.static('public'));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({ secret: "cats" }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use('/login', login);
  app.use('/signup', signup);
  app.use('/logout', logout);
  app.use('/', home);
  require('./set-passport')();
  require('./set-db')();
  require('./set-handlebars')(app);
}