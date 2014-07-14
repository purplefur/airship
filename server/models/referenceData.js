var mongoose = require('mongoose');

var referenceDataValuesSchema = mongoose.Schema({
  label: String,
  value: String
});

var referenceDataSchema = mongoose.Schema({
  name: String,
  type: String,
  data: [referenceDataValuesSchema]
});

var ReferenceData = mongoose.model('ReferenceData', referenceDataSchema, 'referenceData');

module.exports = ReferenceData;