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

// *** mongoose *** //
mongoose.connect('mongodb://roy:101010@ds117539.mlab.com:17539/drawsquad');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: String
});
UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

// *** dbs *** //
var Users = mongoose.model('Users', UserSchema);

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


app.get('/', function(req, res) {
  res.send('root') ;
});

app.post('/signup', function(req, res) {
  console.log('signup')
  passport.authenticate()
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
