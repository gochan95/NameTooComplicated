module.exports = function (app) {
  var { Canvas } = require('./models');

  app.get('/scenes/names/:owner', function(req, res) {
    console.log('getting scene names based on owner');
    Canvas.find({ owner: req.params.owner }, 'name -_id', function(err, result) {
      console.log('found canvas names for owner');
      console.log(result);
      res.json(result);
    })
  });

  app.get('/scenes/:owner/:name', function(req, res) {
    console.log(`getting specific scene under ${req.params.owner} with scene name ${req.params.name}`);
    Canvas.findOne({ owner: req.params.owner, name: req.params.name }, function(err, result) {
      console.log('found the specific scene');
      console.log(result);
      res.json(result);
    })
  })

  app.get('/scenes/:owner', function(req, res) {
    console.log('getting scenes based on owner');
    console.log(`owner is ${req.params.owner}`);
    Canvas.find({ 'owner': req.params.owner }, function(err, result) {
      console.log('here is the result of find');
      console.log(result);
      res.json(result);
    });
  });

	app.post('/scenes/', function(req, res) {
    console.log('saving new canvas');
		console.log(req.body);
		var newCanvas = {
			id: req.body.id,
      lastSaved: req.body.timestamp,
      name: req.body.name,
      owner: req.body.owner,
			camera: req.body.camera,
			scene: req.body.scene
		};
    console.log(newCanvas);
		Canvas.findOneAndUpdate({ owner: req.body.owner, name: req.body.name }, newCanvas, { upsert: true }, function(err, doc) {
      if(err) console.log(err);
      console.log('successfully saved scene');
    });
	})

  // app.post('/scenes/:id/', function(req, res) {
	// 	console.log(req.body);
	// 	console.log('attempting to post scene');
  //   var canvas = new Canvas({ id: req.body.id, camera: req.body.camera, scene: req.body.scene });
  //   canvas.save().then(function(res) {
	// 		console.log('successfully posted canvas')
  //     console.log(res);
  //     res.json(req.body.id);
  //   }, function(err) {
  //     console.log(error);
  //   });
  // });
}
