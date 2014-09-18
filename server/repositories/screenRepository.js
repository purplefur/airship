var db = require('../config/db');

exports.getScreens = function(entityName, done) {
  db.query('SELECT * FROM get_screens($1)', [entityName], function(err, result) {
    if (err) {
      done(err, null);
    }
    else {
      done(null, result.rows);
    }
  });
};

exports.getScreen = function(entityName, screenName, done) {
  db.query('SELECT * FROM get_screen($1,$2) ORDER BY field_order', [entityName, screenName], function(err, result) {
    if (err) {
      done(err, null);
    }
    else {
      done(null, result.rows);
    }
  });
};
