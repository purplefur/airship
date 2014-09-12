var db = require('../config/db');

exports.getRecordDataForUserContext = function(entity, screen, userId, cb) {
  console.log(entity);
  console.log(screen);
  console.log(userId);
  db.query('SELECT * FROM get_record_data_for_user_context($1,$2,$3)', [userId, entity, screen], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      return cb(null, result.rows);
    }
  });
};
