var auth = require('../config/auth'),
    User = require('../models/__user');

module.exports.controller = function(app) {

  app.get('/api/users/:id', auth.requiresRole('admin'), function (req, res) {
    User.findOne({ '_id': req.params.id }).exec(function (err, results) {
      res.send(results);
    });
  });

  app.get('/api/users', auth.requiresRole('admin'), function (req, res) {
    User.find({}).exec(function (err, results) {
      res.send(results);
    });
  });

  app.put('/api/users/:id', auth.requiresRole('admin'), function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {overwrite: true}).exec(function (err, results) {
      res.send(results);
    });
  });
};
