var auth = require('./auth');

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
