var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/airship',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://daboss:wham8am8@ds033818.mongolab.com:33818/airship',
        port: process.env.PORT || 80
    }
};