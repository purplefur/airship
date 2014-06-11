var auth = require('../config/auth'),
    Employee = require('../models/employee');

module.exports.controller = function(app) {

  app.get('/api/employee/:id', auth.requiresAuthentication, function (req, res) {
    Employee.findOne({ '_id': req.params.id }).exec(function (err, results) {
      res.send(results);
    });
  });

  app.get('/api/employees', auth.requiresAuthentication, function (req, res) {
    if (req.query.q) {
      Employee.find({ 'name.display': RegExp(req.query.q, 'i')}).exec(function (err, results) {
        res.send(results);
      });
    } else {
      Employee.find({}).exec(function (err, results) {
        res.send(results);
      });
    }
  });

};