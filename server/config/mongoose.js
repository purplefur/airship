var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function() {
        console.log('airship db connection opened');
    });

    // USERS
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'stevep');
            User.create({firstName: 'Steve', lastName: 'Patterson', username: 'stevep', salt: salt, hashed_pwd: hash, roles: ['admin']});
            User.create({firstName: 'Andy', lastName: 'Court', username: 'acourt', salt: salt, hashed_pwd: hash, roles: []});
        }
    });

    // SCREENS
    var screenSchema = mongoose.Schema({
        name: String,
        fields: [{ label: String }]
    });

    var Screen = mongoose.model('Screen', screenSchema);
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}