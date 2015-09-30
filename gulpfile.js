var gulp = require("gulp"),
  browserSync = require("browser-sync"),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  uncss = require('gulp-uncss');


gulp.task("sass", function () {
  return gulp.src("app/scss/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream())
    .pipe(notify("Done!"));
});


gulp.task('minifyCSS', function () {
  return gulp.src('app/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', "ie 8"],
      cascade: false
    }))
    .pipe(minifyCss())
    .pipe(rename("style.mim.css"))
    .pipe(gulp.dest('app/css'))
    //.pipe(notify("min!"));
});

// неработает пока
gulp.task('uncss', function () {
  return gulp.src('app/css/style.min.css')
    .pipe(uncss({
      html: ['app/*.html']
    }))
    .pipe(gulp.dest('app/css/style.min.css'));
});


gulp.task("server", ["sass", "minifyCSS"], function () {

  browserSync({
    port: 9000,
    server: {
      baseDir: "app"
    }
  });

  gulp.watch("app/scss/**/*.scss", ["sass"]);
  gulp.watch("app/css/**/*.css", ["minifyCSS"]).on("change", browserSync.reload);
  gulp.watch("app/css/**/*.min.css").on("change", browserSync.reload);
  gulp.watch("app/*.html").on("change", browserSync.reload);
  gulp.watch("app/js/**/*.js").on("change", browserSync.reload);

});


gulp.task("default", ["server"]);
