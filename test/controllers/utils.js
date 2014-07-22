var User = require('../../server/models/user.js')
  , fixtures = require('pow-mongodb-fixtures').connect('airship-test');

exports.Authenticate = function(agent, done) {

  fixtures.clear('users', function(err) {
    if (err) {
      console.log(err);
    }

    fixtures.load(__dirname + '/users-admin-fixture.js', function (err) {
      if (err) {
        console.log(err);
      }
      agent
        .post('/login')
        .send({ username: 'stevep', password: 'stevep' })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          agent.saveCookies(res);
          done();
        });
    });
  });
};
