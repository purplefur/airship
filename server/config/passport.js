var passport = require('passport'),
  crypto = require('crypto'),
  LocalStrategy = require('passport-local').Strategy,
  userRepository = require('../repositories/userRepository');

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}

function authenticateUser(user, password) {
  return hashPwd(user.salt, password) === user.hashed_pwd;
}

module.exports = function () {

  passport.use(new LocalStrategy(
    function (username, password, done) {

      userRepository.getUserWithUsername(username, function(err, user) {
        if (err) {
          return done(err);
        }
        else {
          if (user && authenticateUser(user, password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    if (user) {
      done(null, user.id);
    }
  });

  passport.deserializeUser(function (id, done) {
    userRepository.getUserWithId(id, function(err, user) {
      if (err) {
        return done(err);
      }
      else {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    });
  });
};
