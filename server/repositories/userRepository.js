var db = require('../config/db');

exports.getUserWithUsername = function(username, cb) {
  db.query('SELECT * FROM get_account($1, null)', [username], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      if (result.rows.length === 1) {
        return cb(null, result.rows[0]);
      }
      else {
        return cb(null, null);
      }
    }
  });
};

exports.getUserWithId = function(id, cb) {
  db.query('SELECT * FROM get_account(null, $1)', [id], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      if (result.rows.length === 1) {
        return cb(null, result.rows[0]);
      }
      else {
        return cb(null, null);
      }
    }
  });
};

