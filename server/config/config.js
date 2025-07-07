var path = require('path');

module.exports = {
  development: {
    alias: 'development',
    rootPath: path.normalize(__dirname + '/../..'),
    db: 'mongodb://localhost/tagr',
    port: process.env.PORT || 3030
  },
  production: {
    alias: 'production',
    rootPath: path.normalize(__dirname + '/../..'),
    db: process.env.DATABASE_URL || 'mongodb://localhost/tagr',
    port: process.env.PORT || 8081
  },
}
