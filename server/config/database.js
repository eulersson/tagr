var mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, "Connection error..."));
  db.once('open', function callback() { console.log("Tagr db opened")});

  // Create the model
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });
  var User = mongoose.model('User', userSchema);

  // If empty initialize with couple of users
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      User.create({
        firstName: 'Ramon',
        lastName: 'Blanquer',
        userName: 'rblanquer'
      });
      User.create({
        firstName: 'Alejandro',
        lastName: 'Gomez',
        userName: 'agomez'
      });
    }
  })
}