module.exports = function(app, passport) {

  var isLoggedIn = function(req,res,next){
   if(req.user) return next();
   else return res.status(401).json({error: 'User not authenticated'});
  }

  app.get('/checklogin', isLoggedIn, function(req, res, next) {
    res.status(200).json({
        user: req.user.email
    });
    // next();
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

}
