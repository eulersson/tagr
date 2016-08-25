var bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    express         = require('express'),
    morgan          = require('morgan'),
    passport        = require('passport'),
    session         = require('express-session'),
    stylus          = require('stylus');

module.exports = function(app, config) {
  app.set('views', './server/views');
  app.set('view engine', 'jade');

  app.use(stylus.middleware({
    src: config.rootPath + '/public',
    compile: function (str, path) {
      return stylus(str).set('filename', path);
    }
  }));

  config.alias === 'development' ? app.use(morgan('dev')): app.use(morgan('combined'));

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({secret: 'mylittlepony', resave: true, saveUninitialized: true}));
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(config.rootPath + '/public'));
}