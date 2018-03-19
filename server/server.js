var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport')
var mongoose = require('mongoose');
var session = require('express-session');
var cookie = require('cookie-parser');

var app = express();

// *** mongoose *** //
mongoose.connect('mongodb://roy:101010@ds117539.mlab.com:17539/drawsquad');

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


app.use(function(req, res, next) {
  console.log('start server..');
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

// authentication
var auth = require('./auth');
app.use('/auth', auth);

app.use(function(req, res, next) {
  console.log("HTTP Response", res.statusCode);
});

const http = require('http');
const PORT = 3001;

http.createServer(app).listen(PORT, function(err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
  }
);
