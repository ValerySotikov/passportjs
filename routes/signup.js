const passport = require('passport');
const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
  res.render('signup');
});

app.post('/', passport.authenticate('signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true
}));

module.exports = app;