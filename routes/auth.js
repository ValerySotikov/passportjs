const { User } = require('../models/user');
const { Token } = require('../models/verify-token');
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

app.put('/signup/verify-email', async (req, res) => {
  const token = await Token.findOneAndRemove({ token: req.query.token }).then(async response => {
    await User.findByIdAndUpdate(response.userID, { active: true });
  });
});

app.post('/signup', passport.authenticate('signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true
}));

app.get('/verify', (req, res) => {
  console.log(req.body);
});

module.exports = app;