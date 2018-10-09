const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../../models/user');

module.exports = () => {
  passport.use('login', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {

      const isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
      }

      User.findOne({ 'username': username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          console.log('User with username not found', username);
          return done(null, false, req.flash('message', 'User not found'));
        }

        if (!isValidPassword(user, password)) {
          console.log('Invalid password');
          return done(null, false, req.flash('message', 'Invalid password'));
        }
        console.log('Successful logging in');
        return done(null, user);
      });
    }
  ));
};