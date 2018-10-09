const express = require('express');
const passport = require('passport');
const app = express.Router();
const _ = require('lodash');
const {User} = require('../models/user');

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/kek',
                                   failureFlash: true })
);

app.get('/login', (req, res, next) => {
  res.status(404).send('<h1>This is a failure login redirect page</h1>');
});

app.post('/signup', async (req, res) => {
  let user = new User(_.pick(req.body, ['name', 'email', 'password']));
  await user.save();
  res.status(200).send(user);
});

module.exports = app;