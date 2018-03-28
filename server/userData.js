module.exports = function (app) {
  var { Canvas } = require('./models');
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
		var newCanvas = new Canvas({
			id: req.body.id,
			camera: JSON.stringify(req.body.camera),
			scene: JSON.stringify(req.body.scene),
      owner: req.body.owner
		});
    console.log(newCanvas);
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
