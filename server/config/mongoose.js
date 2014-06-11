var mongoose = require('mongoose');

module.exports = function (config) {

  mongoose.connect(config.get('db'));
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function () {
    console.log(config.get('db') + ' db connection opened');
  });

};

