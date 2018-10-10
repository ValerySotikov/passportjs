const express = require('express');
const passport = require('passport');
const app = express.Router();

app.get('/login', (req, res) => {  
  res.render('login');
});

app.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', (req, res) => {
  req.logout();
  console.log('Logging out');
  res.redirect('/login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', passport.authenticate('signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true
}));

module.exports = app;