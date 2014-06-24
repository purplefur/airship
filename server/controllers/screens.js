var auth = require('../config/auth'),
    Screen = require('../models/screen'),
    Employee = require('../models/employee'),
    _ = require('lodash');


function lookupPropertyByName(object, property) {
  var properties = property.split('.');
  var data = _.reduce(properties, function(result, prop) {
    return result && result[prop];
  }, object);
  return data || ' ';
}

module.exports.controller = function(app) {

  app.get('/api/screens', auth.requiresAuthentication, function (req, res) {
    Screen.find({}, function (err, results) {
      res.send(results);
    });
  });

  app.get('/api/screens/:name/:view/data', auth.requiresAuthentication, function (req, res) {
    var records = null;
    var fields = null;

    Employee.find({ _id: { $in: _.pluck(_.last(req.user.contexts).data, '_id') } }).exec()
      .then(function(data) {
        records = data;
        return Screen.findOne({ name: req.params.name }).exec();
        })
      .then(function(data) {
        fields = lookupPropertyByName(data, req.params.view);
      })
      .then(function() {
        var results = _.map(records, function(record) {
          var recordData = _.map(fields, function(field) {
            return { label: field.label, source: field.source, value: lookupPropertyByName(record, field.source)};
          });
          return { recordId: record._id, displayName: record.name.display, data: recordData };
        });

        res.send(results);
      });
  });
};