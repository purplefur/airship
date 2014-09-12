var db = require('../config/db');

exports.setContextForUserFromSearch = function(userId, entity, searchText, searchFields, cb) {
  db.query('SELECT set_context_from_search($1, $2, $3, $4);', [userId, entity, searchText, searchFields], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      return cb(null, true);
    }
  });
};

exports.getContextForUser = function(userId, entity, cb) {
  db.query('SELECT * FROM get_context($1, $2)', [userId, entity], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      // expecting a single row
      if (result.rows.length === 1) {
        return cb(null, result.rows[0]);
      }
      else {
        return cb(null, {});
      }
    }
  });
};

exports.clearContextForUser = function(userId, entity, cb) {
  db.query('SELECT delete_context($1, $2)', [userId, entity], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      return cb(null, true);
    }
  });
};
