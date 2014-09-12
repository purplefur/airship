var pg = require('pg.js'),
  config = require('./config');

module.exports = {
  query: function(text, values, cb) {
    pg.connect(config.get('db'), function(err, client, done) {
      client.query(text, values, function(err, result) {
        done();
        cb(err, result);
      })
    });
  }
};
