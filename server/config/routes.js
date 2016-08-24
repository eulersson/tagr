var auth = require('./auth');

module.exports = function(app, config) {
  app.get('/', function (req, res) {
    res.render('index');
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

  app.get('*', function(req, res) {
    res.render('index');
  })
}