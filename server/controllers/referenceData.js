var auth = require('../config/auth'),
  ReferenceData = require('../models/referenceData');

module.exports.controller = function(app) {
  app.get('/api/referenceData/:name', auth.requiresAuthentication, function(req, res) {
    ReferenceData
      .findOne({ 'name': {
        $regex: new RegExp('^' + req.params.name.toLowerCase(), 'i')
      }})
      .exec(function(err, results) {
        if (results) {
          res.send(results);
        }
        else {
          res.send(400, 'Invalid Name');
        }
      });
  });
};
