"use strict";

var gulp   = require('gulp'),
    server = require('gulp-express');

gulp.task('develop', function() {
  server.run(['server.js']);
  gulp.watch(['public/**/*'], function(event) {
    console.log("Client side code changed, refreshing browser...");
    server.notify(event);
  });

  gulp.watch(['server.js', 'server/**/*'], function(event) {
    console.log("Server side code changed, restarting server...");
    server.run(['server.js']);
  });

});

gulp.task('serve', function() {
  server.run(['server.js'], undefined, false);
});

gulp.task('default', ['serve']);