var mongoose = require('mongoose');

// SCREENS
var screenSchema = mongoose.Schema({
  name: String,
  fields: [
    { label: String }
  ]
});

var Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen;