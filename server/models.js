var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    THREE = require('three');

var User = new Schema({
  email: String,
  salt: String,
  hash: String
});

var CanvasSchema = new Schema({
  id: String,
  lastSaved: Date,
  name: String,
  owner: String,
  // camera: String,
  scene: String
});

// Account.plugin(passportLocalMongoose);

module.exports = {
  User: mongoose.model('User', User),
  Canvas: mongoose.model("Canvas", CanvasSchema)
};
