var mongoose = require('mongoose');

// SCREENS
var fieldSchema = mongoose.Schema({
  label: String,
  source: String,
  type: String,
  referenceData: String
});

var screenSchema = mongoose.Schema({
  _id: Number,
  name: String,
  multiple: [fieldSchema],
  single: [fieldSchema]
});

var Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen;