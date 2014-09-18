var auth = require('../config/auth'),
  contextRepo = require('../repositories/contextRepository');

module.exports.controller = function(app) {

  app.get('/api/context/:entity', auth.requiresAuthentication, function (req, res) {
    contextRepo.getContextForUser(req.user.id, req.params.entity, function (err, result) {
      if (err) {
        res.status(500).send({error: err});
      }
      else {
        console.log(result);
        res.send(result);
      }
    });
  });

  app.post('/api/context/:entity', auth.requiresAuthentication, function (req, res) {
    console.log(req.body);
    contextRepo.setContextForUserFromSearch(req.user.id, req.params.entity, req.body.searchText, req.body.searchFields, function (err, result) {
      if (err) {
        res.status(500).send({error: err});
      }
      else {
        res.send(result);
      }
    })
  })

  app.delete('/api/context/:entity', auth.requiresAuthentication, function (req, res) {
    contextRepo.clearContextForUser(req.user.id, req.params.entity, function (err, result) {
      if (err) {
        res.status(500).send({error: err});
      }
      else {
        res.send(result);
      }
    })
  })
};