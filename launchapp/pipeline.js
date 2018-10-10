const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const home = require('../routes/home');
const flash = require('connect-flash');
const auth = require('../routes/auth');

module.exports = app => {
  app.use(express.static('public'));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({ secret: "cats" }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use('/', home);
  app.use('/', auth);
  require('./set-passport')();
  require('./set-db')();
  require('./set-handlebars')(app);
}