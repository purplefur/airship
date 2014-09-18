var auth = require('../config/auth'),
  referenceDataRepo = require('../repositories/referenceDataRepository');

module.exports.controller = function(app) {

  app.get('/api/referenceData/:id', auth.requiresAuthentication, function(req, res) {
    referenceDataRepo.getReferenceDataWithId(
      req.params.id,
      function (err, result) {
        res.send(result);
      });
  });
};
