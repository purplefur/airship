var auth = require('../config/auth');
var screenRepository = require('../repositories/screenRepository');

module.exports.controller = function(app) {

  app.get('/api/entity/:entityName/screen', auth.requiresAuthentication, function (req, res) {
    screenRepository.getScreens(req.params.entityName, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({"Error": "There was an error retrieving the list of screens"});
      }
      else {
        res.send(result);
      }
    });
  });

  app.get('/api/entities/:entityName/screen/:screenName', auth.requiresAuthentication, function (req, res) {
    screenRepository.getScreens(req.params.entityName, req.params.entityName, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({"Error": "There was an error retrieving details about this screen"});
      }
      else {
        res.send(result);
      }
    });
  });

};
