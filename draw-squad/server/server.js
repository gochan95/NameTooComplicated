var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var cookie = require('cookie-parser');
var passportLocalMongoose = require('passport-local-mongoose');

var app = express();
var Account = require('./models');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// *** mongoose *** //
mongoose.connect('mongodb://roy:101010@ds117539.mlab.com:17539/drawsquad');

// *** dbs *** //


// *** config middleware *** //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public/')));
app.use(session({
    secret: 'draw squad',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// *** passport *** //
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.get('/', function(req, res) {
  console.log('hello')
  res.send('root') ;
});

app.get('/signin', function(req, res) {
  res.render('login', { user : req.user });
});

app.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/signup',function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) console.log(err);

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
  });
});

app.post('/signin', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
//
// // *** error handlers *** //
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

const port = process.env.PORT || 3001;
const http = require('http');

http.createServer(app).listen(port, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", port);

});
