var db = require('../config/db');

exports.getScreens = function(entityName, cb) {
  db.query('SELECT * FROM get_screens($1)', [entityName], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      return cb(null, result.rows);
    }
  });
};

exports.getScreen = function(entityName, screenName, cb) {
  db.query('SELECT * FROM get_screen($1,$2)', [entityName, screenName], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      return cb(null, results.rows);
    }
  });
};
