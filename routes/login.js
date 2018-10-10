const express = require('express');
const passport = require('passport');
const app = express.Router();

app.get('/', (req, res) => {  
  res.render('login');
});

app.post('/', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = app;