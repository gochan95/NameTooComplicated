var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = require('./models');

// *** passport *** //
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.use(function(req, res, next) {
  console.log('starting auth ..');
  next();
});

router.get('/signin', function(req, res) {
  console.log('get current user');
});

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('http://localhost:3000');
});

router.post('/signup',function(req, res) {
  Account.register(new Account(
    { username : req.body.username }),
      req.body.password,
      function(err, account) {
        if (err) console.log(err);
        passport.authenticate('local')(req, res,
          function () {
          // res.redirect('/');
        });
  });
});

router.post('/signin', passport.authenticate('local'), function(req, res) {
  console.log('signin')
  // res.json(res)
});

module.exports = router;
