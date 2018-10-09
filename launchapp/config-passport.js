const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('CHECKING_CHECKING_CHECKING');
      User.findOne({ username: username }, (err, user) => {
        console.log('CHECKING_CHECKING_CHECKING');
        if (err) {
          console.log(done(err));
          return done(err);
        }

        if (!user) {
          console.log(done(null, false, { message: 'Incorrect username.' }));
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(password)) {
          console.log(done(null, false, { message: 'Incorrect password.' }));
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(done(null, user));
        return done(null, user);
      });
    }
  ));
};