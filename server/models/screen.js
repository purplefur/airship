var mongoose = require('mongoose');

// SCREENS
var fieldSchema = mongoose.Schema({
  label: String,
  source: String,
  type: String
});

var screenSchema = mongoose.Schema({
  _id: Number,
  name: String,
  summary: [fieldSchema],
  full: [fieldSchema]
});

var Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen;