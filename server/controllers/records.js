var auth = require('../config/auth');
var recordRepository = require('../repositories/recordRepository');

module.exports.controller = function (app) {

  // Gets a single entity record
  app.get('/api/record/:entity/:screen', auth.requiresAuthentication, function (req, res) {
    recordRepository.getRecordDataForUserContext(
      req.params.entity,
      req.params.screen,
      req.user.id,
      function (err, result) {
        res.send(result);
      });
  });

  app.post('/api/record/:entity/:screen/:recordId', auth.requiresAuthentication, function (req, res) {

    recordRepository.updateRecordData(
      req.params.entity,
      req.params.screen,
      req.params.recordId,
      req.user.id,
      req.body,
      function (err, result) {
        res.send(result);
      });
  });

//  // Gets a collection of entity records (with optional search criteria)
//  app.get('/api/records/:entity/:screen', function(req, res) {
//    recordRepository.getRecords(req.params.)
//
//  });


};
