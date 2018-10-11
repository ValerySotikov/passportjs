const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
});

const Token = mongoose.model('Token', tokenSchema);

exports.Token = Token;