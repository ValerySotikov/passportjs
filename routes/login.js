const express = require('express');
const passport = require('passport');
const app = express.Router();

app.get('/', (req, res) => {
  res.status(200).send('<h1>TEST LOGIN PAGE</h1>');
});

app.post('/', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = app;