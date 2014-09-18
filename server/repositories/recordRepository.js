var db = require('../config/db');

exports.getRecordDataForUserContext = function(entity, screen, userId, cb) {
  db.query('SELECT * FROM get_record_data_for_user_context($1,$2,$3)', [userId, entity, screen], function(err, result) {
    if (err) {
      return cb(err, null);
    }
    else {
      return cb(null, result.rows);
    }
  });
};

exports.updateRecordData = function(entity, screen, recordId, userId, data, cb) {
  console.log(entity);
  console.log(screen);
  console.log(recordId);
  console.log(userId);
  console.log(data);
  db.query('SELECT update_record_data($1,$2,$3,$4,$5)', [entity, screen, recordId, userId, data], function(err,result) {
    if (err) {
      console.log(err);
      return cb(err, null);
    }
    else {
      return cb(null, result);
    }
  });
};
