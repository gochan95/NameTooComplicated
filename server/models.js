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

var CanvasSchema = new Schema({
  id: String,
  camera: String,
  scene: String
})

var Canvas = mongoose.model("Canvas", CanvasSchema);

// Account.plugin(passportLocalMongoose);

module.exports = {
  Account: mongoose.model('Account', Account),
  Canvas: mongoose.model("Canvas", CanvasSchema)
};
