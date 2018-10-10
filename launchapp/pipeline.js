const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const home = require('../routes/home');
const flash = require('connect-flash');
const auth = require('../routes/auth');

module.exports = app => {
  //  Configure static files folder
  app.use(express.static('public'));

  //  Parsing incoming request json format
  app.use(bodyParser.urlencoded({ extended: false }));

  //  For saving session data at the server side,
  //  not at cookies (only session id at cookies)
  app.use(session({ secret: "cats" }));

  //  Initializing authentication module
  app.use(passport.initialize());

  //  Session middleware for alerting user property of incoming req
  //  with current session id
  app.use(passport.session());

  //  Messaging
  app.use(flash());

  //  Routing to home page
  app.use('/', home);

  //  Routing to auth pages
  app.use('/', auth);

  //  Configuring serialization, deserialization
  //  and auth strategies
  require('./set-passport')();

  //  Connecting to MongoDB database
  require('./set-db')();

  //  Configuring handlebars 
  require('./set-handlebars')(app);
}