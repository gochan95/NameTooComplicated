'use strict';

module.exports = function (app) {
  var _require = require('./models'),
      Canvas = _require.Canvas;

  app.get('/scenes/names/:owner', function (req, res) {
    Canvas.find({ owner: req.params.owner }, 'name -_id', function (err, result) {
      res.json(result);
    });
  });

  app.get('/scenes/:owner/:name', function (req, res) {
    Canvas.findOne({ owner: req.params.owner, name: req.params.name }, function (err, result) {
      res.json(result);
    });
  });

  app.get('/scenes/:owner', function (req, res) {
    Canvas.find({ 'owner': req.params.owner }, function (err, result) {
      res.json(result);
    });
  });

  app.post('/scenes/', function (req, res) {
    var newCanvas = {
      id: req.body.id,
      lastSaved: req.body.timestamp,
      name: req.body.name,
      owner: req.body.owner,
      camera: req.body.camera,
      scene: req.body.scene
    };
    Canvas.findOneAndUpdate({ owner: req.body.owner, name: req.body.name }, newCanvas, { upsert: true }, function (err, doc) {
      if (err) console.log(err);
    });
  });

};
