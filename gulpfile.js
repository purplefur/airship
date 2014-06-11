// include gulp and plug-ins
var gulp = require('gulp')
  , mocha = require('gulp-mocha')
  , jshint = require('gulp-jshint');

var paths = {
  server: './server/**/*.js',
  test: './test/**/*.js'
};

// jshint
gulp.task('lint', function() {
  return gulp.src([paths.server])
    .pipe(jshint({ laxcomma: true }))
    .pipe(jshint.reporter('default'));
});

// mocha
gulp.task('mocha', function() {
  return gulp.src(paths.test, { read: false})
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('end', function() {
      process.exit();
    });
});

// Default does everything
gulp.task('default', ['lint', 'mocha'], function() {
});