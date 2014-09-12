var express = require('express'),
  fs = require('fs'),
  stylus = require('stylus'),
  passport = require('passport');

module.exports = function (app, config) {

  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  app.configure(function () {
    app.set('views', config.get('rootPath') + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    if (config.get('NODE_ENV') !== 'test') { // don't show http logs during testing
      app.use(express.logger('dev'));
    }
    app.use(express.session({ secret: 'airshippangolins' }));
//    app.use(express.session({ secret: 'airshippangolins', cookie: {maxAge: 30000} }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
      {
        src: config.rootPath + '/public',
        compile: compile
      }
    ));
    app.use(express.static(config.get('rootPath') + '/public'));
  });

  // dynamically include the controller routes
  fs.readdirSync(config.get('rootPath') + '/server/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
      var route = require(config.get('rootPath') + '/server/controllers/' + file);
      route.controller(app);
    }
  });
};
