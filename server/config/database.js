var crypto   = require('crypto'),
    mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, "Connection error..."));
  db.once('open', function callback() { console.log("Tagr db opened")});

  // Create the model
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    salt: String,
    hashed_pwd: String

  });
  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }
  var User = mongoose.model('User', userSchema);

  // If empty initialize with couple of users
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt1 = createSalt();
      var hash1 = hashPwd(salt1, 'rblanquer');
      User.create({
        firstName: 'Ramon',
        lastName: 'Blanquer',
        userName: 'rblanquer',
        salt: salt1,
        hashed_pwd: hash1
      });
      var salt2 = createSalt();
      var hash2 = hashPwd(salt2, 'alealejandro');
      User.create({
        firstName: 'Alejandro',
        lastName: 'Gomez',
        userName: 'agomez',
        salt: salt2,
        hashed_pwd: hash2
      });
    }
  })
}

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}