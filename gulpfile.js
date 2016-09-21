"use strict";

var gulp   = require('gulp'),
    server = require('gulp-express');

gulp.task('develop', ['start-server', 'watch-client-side', 'watch-server-side']);

gulp.task('start-server', function() {
  server.run(['server.js']);
});

// Watch for changes in client-side code and refresh browser if needed
gulp.task('watch-client-side', function() {
  gulp.watch(['public/**/*'], function(event) {
    server.notify(event);
  });
});

// Watch for canges in server-side code and restart server if needed
gulp.task('watch-server-side', function() {
  gulp.watch(['server.js', 'server/**/*'], function(event) {
    server.run(['server.js']);
  });
});

gulp.task('default', function() {
  console.log("If you want to spin the server run: node server.js")
});