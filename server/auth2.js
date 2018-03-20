module.exports = function(app, passport) {


  app.get('/', function(req, res) {
    res.json('hah, u got me!');
  });


  app.post('/auth/signup', passport.authenticate('local-signup'), function(req, res) {
    console.log('signup');
    res.json(req.body.username);
  });

  app.post('/auth/signin', passport.authenticate('local-signin'), function(req, res) {
    res.json(req.body.username);
  });

  app.get('/profile', isLoggedIn,  function(req, res) {

  });

  app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');

  }
}
