var auth = require('../config/auth'),
    User = require('../models/user');

module.exports.controller = function(app) {

  app.get('/api/users/:id', auth.requiresRole('admin'), function (req, res) {
    User.findOne({ '_id': req.params['id'] }).exec(function (err, results) {
      res.send(results);
    })
  });

  app.get('/api/users', auth.requiresRole('admin'), function (req, res) {
    User.find({}).exec(function (err, results) {
      res.send(results);
    });
  });

  app.put('/api/users/:user', auth.requiresRole('admin'), function (req, res) {
    User.findByIdAndUpdate(req.user._id, { $set: { contexts: req.user.contexts }}, function (err, user) {
      res.send(user);
    });
  })
};
