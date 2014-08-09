var auth = require('../config/auth'),
    Entity = require('../models/entity');

module.exports.controller = function(app) {

  app.get('/api/entities', auth.requiresAuthentication, function (req, res) {
    Entity.find({}, '_id name').exec(function (err, results) {
      res.send(results);
    });
  });

  app.get('/api/entities/:id', auth.requiresAuthentication, function (req, res) {
    Entity.findById(req.params.id).exec(function (err, entity) {
      if (entity) {
        res.send(entity);
      }
      else {
        res.send(400, 'Invalid Id');
      }
    });
  });

  app.put('/api/entities/:id', auth.requiresAuthentication, function (req, res) {
    Entity.findOneAndUpdate({ _id: req.params.id }, req.body, {overwrite: true}).exec(function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        res.send(400, 'Invalid Id');
      }
    });
  });
};