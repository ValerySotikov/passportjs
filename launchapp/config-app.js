const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const login = require('../routes/login');
const flash = require('connect-flash');

module.exports = app => {
  app.use(express.static('public'));
  app.use(session({ secret: "cats" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use('/auth', login);
  require('./config-passport')();
  require('./db')();
}