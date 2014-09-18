var db = require('../config/db');

exports.getReferenceDataWithId = function(id, cb) {
  db.query('SELECT get_reference_data_with_id($1) as referenceData', [id], function(err, result) {
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
