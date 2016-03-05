var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsFiles = ['*.js', 'src/**/*.js'];
var nodemon = require('gulp-nodemon');

gulp.task('style', function() {
  gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {
          verbose: true
      }));
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var wiredepOptions = {
    ignorePath: "../../bower_components/",
    fileTypes: {
      html: {
        replace: {
          js: '<script src="/lib/{{filePath}}"></script>',
          css: '<link rel="stylesheet" href="/lib/{{filePath}}" />'
        }
      }
    }
  };

  return gulp.src('src/views/*.html')
             .pipe(wiredep(wiredepOptions))
             .pipe(gulp.dest('src/views'));
});


gulp.task('serve', ['style'], function() {
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 5000
    },
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function(ev) {
      console.log('Restarting.....');
    });
});