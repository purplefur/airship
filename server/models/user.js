var mongoose = require('mongoose'),
    crypto = require('crypto');

// CONTEXTS
var contextSchema = mongoose.Schema({
  label: String,
  data: [{ _id: Number }]
});

// USERS
var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  salt: String,
  hashed_pwd: String,
  roles: [String],
  contexts: [contextSchema]
});

userSchema.methods = {
  authenticate: function (passwordToMatch) {
    return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  }
};

var User = mongoose.model('User', userSchema);

//User.find({}).exec(function (err, collection) {
//  if (collection.length === 0) {
//    var salt, hash;
//    salt = createSalt();
//    hash = hashPwd(salt, 'stevep');
//    User.create({firstName: 'Steve', lastName: 'Patterson', username: 'stevep', salt: salt, hashed_pwd: hash, roles: ['admin']});
//  }
//});

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}