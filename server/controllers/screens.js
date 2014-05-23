var auth = require('../config/auth'),
    Screen = require('../models/screen');

module.exports.controller = function(app) {

  app.get('/api/screens', auth.requiresAuthentication, function (req, res) {
    Screen.find({}).exec(function (err, results) {
      res.send(results);
    })
  });

};