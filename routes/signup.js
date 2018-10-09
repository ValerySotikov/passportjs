const passport = require('passport');
const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
  res.status(200).send('<h1>TEST SIGNUP PAGE</h1>');
});

app.post('/', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

module.exports = app;