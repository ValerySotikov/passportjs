const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).required()
  }

  return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;