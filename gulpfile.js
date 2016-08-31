"use strict";

var gulp   = require('gulp'),
    server = require('gulp-express');

gulp.task('develop', ['start-server', 'refresh-client', 'restart-server']);

gulp.task('start-server', function() {
  server.run(['server.js']);
});

gulp.task('refresh-client', function() {
  gulp.watch(['public/**/*'], function(event) {
    server.notify(event);
  });
});

gulp.task('restart-server', function() {
  gulp.watch(['server.js', 'server/**/*'], function(event) {
    server.run(['server.js']);
  });
});

gulp.task('serve', function() {
  server.run(['server.js'], undefined, false);
});

gulp.task('default', ['serve']);