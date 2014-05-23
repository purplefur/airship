var express = require('express'),
  fs = require('fs'),
  stylus = require('stylus'),
  passport = require('passport');

module.exports = function (app, config) {

  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  app.configure(function () {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'airship pangolins' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
      {
        src: config.rootPath + '/public',
        compile: compile
      }
    ));
    app.use(express.static(config.rootPath + '/public'));
  });

  // dynamically include the controller routes
  fs.readdirSync(config.rootPath + '/server/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
      var route = require(config.rootPath + '/server/controllers/' + file);
      route.controller(app);
    }
  })

};

