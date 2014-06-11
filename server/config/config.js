var nconf = require('nconf')
  , path = require('path');

function Config() {
  nconf.argv().env();

  var rootPath = path.normalize(__dirname + '/../..');
  var environment = nconf.get('NODE_ENV') || 'development';

  nconf.file(rootPath + '/server/config/' + environment + '.json');

  nconf.defaults({
    'rootPath': rootPath
  });
}

Config.prototype.get = function(key) {
  return nconf.get(key);
};

module.exports = new Config();
