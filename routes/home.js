const express = require('express');
const app = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  console.log('redirect')
  res.redirect('/login');
};

app.get('/', isAuthenticated, function(req, res) {
  res.render('home');
});

module.exports = app;