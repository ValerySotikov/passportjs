const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');


module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

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

  passport.use('signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {

      const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
      }
      console.log(1);
      findOrCreateUser = function() {
        console.log(2);
        User.findOne({ username: username }, (err, user) => {
          console.log(3);
          if (err) {
            console.log(done(err));
            return done(err);
          }
  
          if (user) {
            console.log('User already exists');
            return done(null, false, req.flash('message', 'User already exists'));
          } else {
            /**
             * Username
             * First name
             * Last name
             * email
             * password
             */
            let userDescription = _.pick(req.body, ['username', 'firstName', 'lastName', 'email', 'password']);
            userDescription.password = createHash(userDescription.password);
            let user = new User(userDescription);
            console.log(4);
            user.save((err) => {
              if (err) {
                console.log('Error during user saving', err);
                throw err;
              }
              console.log('Successful user registration');
              return done(null, user);
            });
            console.log(5);
          }
        });
      };
      process.nextTick(findOrCreateUser);   
    }
  ));
};