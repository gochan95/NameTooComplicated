module.exports = function (app) {
  var { Canvas } = require('./models');

  var isLoggedIn = function(req,res,next){
   if(req.user) return next();
   else return res.status(401).json({error: 'User not authenticated'});
  }

  app.get('/scenes/names/:owner', isLoggedIn, function(req, res) {
    Canvas.find({ owner: req.params.owner }, 'name -_id', function(err, result) {
      res.json(result);
    })
  });

  app.get('/scenes/:owner/:name', isLoggedIn, function(req, res) {
    Canvas.findOne({ owner: req.params.owner, name: req.params.name }, function(err, result) {
      res.json(result);
    })
  })

  app.get('/scenes/:owner', isLoggedIn, function(req, res) {
    Canvas.find({ 'owner': req.params.owner }, function(err, result) {
      res.json(result);
    });
  });

	app.post('/scenes/', isLoggedIn, function(req, res) {
		var newCanvas = {
			id: req.body.id,
      lastSaved: req.body.timestamp,
      name: req.body.name,
      owner: req.body.owner,
			camera: req.body.camera,
			scene: req.body.scene
		};
		Canvas.findOneAndUpdate({ owner: req.body.owner, name: req.body.name }, newCanvas, { upsert: true }, function(err, doc) {
      if(err) console.log(err);
    });
	})

}
