var gulp = require('gulp');
var googlecdn = require('gulp-google-cdn');
var mainBowerFiles = require('main-bower-files');

gulp.task('default', function () {
  return gulp.src('index.html')
    .pipe(googlecdn(require('./bower.json')))
    .pipe(gulp.dest('dist'));
});

// todo: починить
// note: не вытаскивает минифицированный файл из jquery и не дает в другую папку перенаправлять
gulp.task('mainJS', function () {
  return gulp.src(mainBowerFiles("**/*.js"))
    .pipe(gulp.dest("dist/js"))
});


gulp.task('mainCSS', function () {
  return gulp.src(mainBowerFiles("**/*.css"))
    .pipe(gulp.dest("dist/css"))
});


gulp.task('mainSCSS', function () {
  return gulp.src(mainBowerFiles("**/*.scss"))
    .pipe(gulp.dest("dist/scss"))
});


