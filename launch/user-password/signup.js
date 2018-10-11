const bcrypt = require('bcrypt');
const _ = require('lodash');
const LocalStrategy = require('passport-local');
const { User } = require('../../models/user');
const { Token } = require('../../models/verify-token');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('config');

module.exports = passport => {
  passport.use('signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {

      const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
      }
      findOrCreateUser = function() {
        User.findOne({ username: username }, (err, user) => {
          if (err) return done(err);
  
          if (user) {
            console.log(`User with username ${username} is already exists`);
            return done(null, false, req.flash('message', 'User already exists'));
          } else {
            let userDescription = _.pick(req.body, ['username', 'firstName', 'lastName', 'phone', 'email', 'password']);
            userDescription.password = createHash(userDescription.password);
            let user = new User(userDescription);
            user.save((err) => {
              if (err) {
                console.log('Error during user saving', err);
                throw err;
              }
              console.log('Successful user registration');
              sendMail(req.body.email, user._id);
              return done(null, user);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);   
    }
  ));
};

const sendMail = (email, userID) => {
    const token = crypto.createHash('sha256').update(email).digest('hex');

    let tokenRecord = new Token({ token: token, userID: userID });
    tokenRecord.save();
  
    const transporter = nodemailer.createTransport({
      service: 'yandex',
      auth: {
        user: 'sotikov.valery@imperivm.team',
        pass: '1qw2azxscde3'
      }
    });
  
    const mailOptions = {
      from: 'sotikov.valery@imperivm.team',
      to: email,
      subject: 'Verify email',
      text: `Please, follow the link to verify your email: http://localhost:3000/signup/verify-email?action=put&token=${token}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
