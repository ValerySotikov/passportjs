const passport = require('passport');
const { User } = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      err ? done(err, user)
          : done(null, user);
    });
  });

  require('./user-password/login')();
  require('./user-password/signup')();
};