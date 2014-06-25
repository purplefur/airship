var express = require('express');

var app = express();

var config = require('./server/config/config');

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

var port = process.env.PORT || config.get('port');
app.listen(port);
console.log('Listening on port ' + port + '...');

module.exports = app;