'use strict';

var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

var _require = require('../models'),
    User = _require.User;

module.exports = function (passport) {

  console.log(passport);
  // passport session setup
  // required for persistent login sessions
  // passport needs a way to serializeUser and deserializeUser

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // use named strategies
  passport.use('local-signup', new LocalStrategy(function (username, password, done) {
    console.log('trying to do local signup');
    console.log(username, password);
    console.log('checking user schema');
    User.findOne({ 'email': username }, function (err, user) {
      if (err) return done(err);
      // console.log(user);
      if (user) {
        return done(null, false, { 'message': 'Email already exists' });
      } else {
        console.log('new user');
        var salt = generateSalt();
        var newAccount = new User({ email: username, salt: salt, hash: generateHash(password, salt) });
        // var salt = generateSalt();
        // var hash = generateHash(password, salt);
        // newAccount.local.email = username;
        // newAccount.local.salt = generateSalt();
        // newAccount.local.hash = generateHash(password, newAccount.local.salt);

        newAccount.save().then(function (result) {
          console.log('saved newAccount');
          console.log(result);
          return done(null, result);
        }, function (err) {
          console.log('error saving new Account');
          console.log(err);
          return done(err);
        });
        // newAccount.save(function(err) {
        //   if (err) done(err);
        //   return done(null, newAccount);
        // });
        console.log(newAccount);
      }
    });
    // console.log(username, password)
  }));

  passport.use('local-signin', new LocalStrategy(function (username, password, done) {
    User.findOne({ 'email': username }, function (err, user) {
      if (err) return done(err);

      if (!user) return done(null, false, { 'message': 'Incorrect Username' });

      if (user.hash != generateHash(password, user.salt)) {
        return done(null, false, { 'message': 'Incorrect Password' });
      }

      return done(null, user);
    });
  }));

  // functions to generateHash, generateSalt
  function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
  }

  function generateHash(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
  }
};