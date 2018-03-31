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
  camera: String,
  scene: String,
  owner: String
});

// Account.plugin(passportLocalMongoose);

module.exports = {
  User: mongoose.model('User', User),
  Canvas: mongoose.model("Canvas", CanvasSchema)
};
