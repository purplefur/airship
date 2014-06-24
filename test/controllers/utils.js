var User = require('../../server/models/user.js');

var authUser = new User();
authUser.username = 'stevep';
authUser.salt = '9dXOoWrsUeL8xWfrHJzBfVu0OcwvWKyltCcUpfdB+JcZJR0RGK1sT+fjuDREggns4RV9A3kHwImgU9lMQvg90BiKVV3/DL2DKq2U6KpnYQyaoaeKP3swsKXMuU7C8ms25tE6jUId2tfAfjBMv1hzF9da1uNmWc93tIdQCn7EmJw=';
authUser.hashed_pwd = 'ed69ce5d80c9600e0f7edf5d68f7ac7dac442730';
authUser.roles = ['admin'];
authUser.contexts = [{ label: 'My team', data: [{ _id: 1 }, { _id: 2 }] }];

exports.seedWithTestUserAndAuthenticate = function(agent, done) {
  User.remove({}).exec()
    .then(function () {
      User.create(authUser);
    })
    .then(function() {
      agent
        .post('/login')
        .send({ username: authUser.username, password: authUser.username })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          agent.saveCookies(res);
          done();
        });
    });
};
