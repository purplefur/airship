var express = require('express');

var app = express();

var config = require('./server/config/config');

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.get('port'));
console.log('Listening on port ' + config.get('port') + '...');

module.exports = app;