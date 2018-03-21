var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({

    local: {
      email: String,
      salt: String,
      hash: String,
    },

    facebook: {
      id: String,
      token: String,
      name: String,
      email: String,
    },

    twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String,
    },

    google: {
      id: String,
      token: String,
      email: String,
      name: String
    }

});

// Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
