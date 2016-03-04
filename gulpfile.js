var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
  gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var options = {
    ignorePath: "../../bower_components/",
    fileTypes: {
      html: {
        replace: {
          js: '<script src="/lib/{{filePath}}"></script>',
          css: '<link rel="stylesheet" href="/lib/{{filePath}}" />'
        }
      }
    }
  }
  return gulp.src('src/views/*.html')
    .pipe(wiredep(options))
    .pipe(gulp.dest('src/views'));
});