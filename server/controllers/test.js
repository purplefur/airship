var userRepository = require('../repositories/userRepository');

module.exports.controller = function(app) {

  app.get('/test/:username', function (req, res) {

    userRepository.getUserByUsername(req.params.username, function(err, result) {
      if (err) {
        res.status(500).send({ error: err });
      }
      else {
        res.status(200).send(result);
      }
    });
  });

};