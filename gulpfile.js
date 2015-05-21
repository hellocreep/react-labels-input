var gulp       = require('gulp');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var minifyCSS  = require('gulp-minify-css');
var connect    = require('gulp-connect');
var gulpFilter = require('gulp-filter');
var expect     = require('gulp-expect-file');
var sass       = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source     = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    port: 8000,
    livereload: true
  });
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch('./scss/**', ['sass']);
});

gulp.task('browserify', function() {
  browserify(['./src/index.js'], {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./bundle/'))
    .pipe(livereload());
});

gulp.task('sass', function() {
  gulp.src('scss/tagsinput.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});


gulp.task('default', ['browserify', 'sass']);

gulp.task('dev', ['default', 'connect', 'watch']);
