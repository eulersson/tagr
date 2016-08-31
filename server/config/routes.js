var auth = require('./auth');

module.exports = function(app, config) {
  app.get('/', function (req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });

  app.get('/partials/:partialPath(*)', function(req, res) {
    res.render(config.rootPath + '/public/app/' + req.params.partialPath);
  });

  app.post('/login', auth.authenticate, function(req, res) {
    console.log("AI!");
  });

  app.post('/testme', function(req, res) {
    res.send({message: "Welcome hell brother."})
  })

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  })
}