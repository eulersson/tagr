var path = require('path');

module.exports = {
  development: {
    alias: 'development',
    rootPath: path.normalize(__dirname + '/../..'),
    db: 'mongodb://localhost/tagr',
    port: process.env.port || 3000
  },
  production: {
    alias: 'production',
    rootPath: path.normalize(__dirname + '/../..'),
    db: 'mongodb://rblanquer:multivision@ds063725.mlab.com:63725/heroku_3b1zpcq7',
    port: process.env.port || 80
  }
}