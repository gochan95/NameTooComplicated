module.exports = function (app) {
  var { Canvas } = require('./models');
	app.get('/scenes/:id', function(req, res) {
		Canvas.findOne({ id: req.params.id }, function(err, result) {
			console.log(err);
			console.log(req.params);
			res.json(result);
		});
		// res.json(req.body);
		console.log('read scenes haha');
	});

	app.post('/scenes/', function(req, res) {
		console.log(req.body);
		var newCanvas = new Canvas({
			id: req.body.id,
			camera: req.body.camera,
			scene: req.body.scene
		});
		newCanvas.save().then(function(res) {
			console.log('successfully saved canvas');
		}, function(err) {
			console.log(err);
		})
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
