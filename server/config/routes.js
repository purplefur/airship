var auth = require('./auth'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Screen = mongoose.model('Screen'),
  Employee = mongoose.model('Employee');

module.exports = function (app) {

  // AngularJS routes (client)
  app.get('/partials/*', function (req, res) {
    res.render('../../public/app/' + req.params);
  });

  // LOGIN/LOGOUT
  app.post('/login', auth.authenticate);

  app.post('/logout', function (req, res) {
    req.logout();
    res.end();
  });

  // API routes
  app.get('/api/users', auth.requiresRole('admin'), function (req, res) {
    User.find({}).exec(function (err, results) {
      res.send(results);
    });
  });

  app.get('/api/screens', auth.requiresAuthentication, function (req, res) {
    Screen.find({}).exec(function (err, results) {
      res.send(results);
    })
  });

  app.get('/api/employee/:id', auth.requiresAuthentication, function (req, res) {
    Employee.findOne({ '_id': req.params['id'] }).exec(function (err, results) {
      res.send(results);
    })
  });

  app.get('/api/employees', auth.requiresAuthentication, function (req, res) {
    Employee.find({}).exec(function (err, results) {
      res.send(results);
    })
  });

  app.all('/api/*', function (req, res) {
    res.send(404);
  });

  // Default route
  app.get('*', function (req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
}
