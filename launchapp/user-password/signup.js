const bcrypt = require('bcrypt');
const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../../models/user');


module.exports = () => {
  passport.use('signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {

      const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
      }
      findOrCreateUser = function() {
        User.findOne({ username: username }, (err, user) => {
          if (err) {
            console.log(done(err));
            return done(err);
          }
  
          if (user) {
            console.log('User already exists');
            return done(null, false, req.flash('message', 'User already exists'));
          } else {
            let userDescription = _.pick(req.body, ['username', 'firstName', 'lastName', 'email', 'password']);
            //  Replace vanilla password with hash
            userDescription.password = createHash(userDescription.password);
            let user = new User(userDescription);
            user.save((err) => {
              if (err) {
                console.log('Error during user saving', err);
                throw err;
              }
              console.log('Successful user registration');
              return done(null, user);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);   
    }
  ));
};