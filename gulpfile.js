"use strict";

var browserSync = require('browser-sync').create();
var watchify = require('watchify');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var message = gutil.env.message;

var onError = function(err) {
  console.log(err.message);
  this.emit('end');
};


// clean build folder
gulp.task('clean', function() {
  return del(['build/**/*']);
});


// bundling js with browserify and watchify
var b = watchify(browserify('src/js/AB-core', {
  cache: {},
  packageCache: {},
  fullPaths: false
}));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', onError)
    .pipe(source('AB.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
}


// jshint
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(browserSync.stream());
});



// jade
gulp.task('jade', function() {
  return gulp.src('src/views/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .on('error', onError)
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});


// sass
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', onError))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }));
});


// copy
gulp.task('copy:js', function() {
  return gulp.src([
      'src/js/demo/*.js'
    ])
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
});
gulp.task('copy:scss', function() {
  return gulp.src([
      'src/scss/_AB-settings.scss'
    ])
    .pipe(gulp.dest('./build/scss/'))
    .pipe(browserSync.stream());
});
gulp.task('copy:assets', function() {
  return gulp.src([
      'src/views/img/*'
    ])
    .pipe(gulp.dest('./build/img/'))
    .pipe(browserSync.stream());
});


// browser sync server
gulp.task('serve', function() {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: 'build'
    },
    ui: {
      port: 3001
    },
    open: false,
    notify: true,
    reloadOnRestart: true
  }, function callback() {
    gulp.watch('src/views/**/*.jade', ['jade', 'copy:assets', browserSync.reload]);
    gulp.watch('src/scss/**/*.scss', ['sass', 'copy:scss']);
    gulp.watch('src/js/demo/*.js', ['copy:js', browserSync.reload]);
    gulp.watch('build/js/*.js', ['lint']);
  });
});


// GULP build task
gulp.task('build', gulpSequence(
  'clean', ['copy:js', 'jade', 'copy:assets', 'sass', 'copy:scss', 'js'],
  'lint'
));

// GULP work task
gulp.task('default', gulpSequence(
  'build',
  'serve'
));
