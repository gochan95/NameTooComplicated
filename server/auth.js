var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = require('./models');

// *** passport *** //
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({username: username}, function(err, user){
      if (err) return done(err);
      if (!user) {
        return done(null, false, {message: "Incorrect username"});
      }

      if (!password) {
        return done(null, false, {message: "Incorrect password"});
      }

      return done(null, user);
    });
  })
)

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
  // Account.register(new Account(
  //   { username : req.body.username }),
  //     req.body.password,
  //     function(err, account) {
  //       if (err) console.log(err);
  //       passport.authenticate('local')(req, res,
  //         function () {
  //         res.json({username: req.body.username});
  //       });
  // });
});

// router.post('/signin', passport.authenticate('local'), function(req, res) {
//   console.log('signin');
//   res.json({username: req.body.username});
// });

router.post('/signin', passport.authenticate('local', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: 'http://localhost:3000/auth/signin',
  failureFlash: true
}));

module.exports = router;
