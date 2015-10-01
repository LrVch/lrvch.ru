var gulp = require("gulp"),
  browserSync = require("browser-sync"),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  uncss = require('gulp-uncss');

// sass
gulp.task("sass", function () {
  return gulp.src("app/scss/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream())
    .pipe(notify("Done!"));
});

// minify
gulp.task('minifyCSS', function () {
  return gulp.src('app/css/style.css')
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('app/css'))
});

// autoprefixer
gulp.task('autoprefixer', function () {
  return gulp.src('app/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 6 versions', "ie 8"],
      cascade: false
    }))
    .pipe(gulp.dest('app/css/'));
});

// uncss неработает пока
gulp.task('uncss', function () {
  return gulp.src('app/css/style.min.css')
    .pipe(uncss({
      html: ['app/**/*.html']
    }))
    .pipe(gulp.dest('app/css/style.min.css'));
});

// browsersync
gulp.task("server", ["sass", "autoprefixer"], function () {

  browserSync({
    port: 9000,
    server: {
      baseDir: "app"
    }
  });

  gulp.watch("app/scss/**/*.scss", ["sass"]);
  gulp.watch("app/css/**/*.css", ["autoprefixer"]).on("change", browserSync.reload);
  //gulp.watch("app/css/**/*.min.css").on("change", browserSync.reload);
  gulp.watch("app/*.html").on("change", browserSync.reload);
  gulp.watch("app/js/**/*.js").on("change", browserSync.reload);

});


gulp.task("default", ["server"]);