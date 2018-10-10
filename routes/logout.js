const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
  req.logout();
  console.log('Logging out');
  res.redirect('/login');
});

module.exports = app;
