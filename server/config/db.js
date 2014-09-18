var pg = require('pg.js'),
  config = require('./config');

module.exports = {
  query: function(text, values, cb) {
    pg.connect(config.get('airship_db'), function(err, client, done) {
      if (err) {
        console.log('Error connecting to database');
        console.log(err);
      }
      else {
        client.query(text, values, function(err, result) {
          if (err) {
            if (err) {
              console.log('Error running query');
              console.log(err);
            }
          }
          done();
          cb(err, result);
        })
      }
    });
  }
};
