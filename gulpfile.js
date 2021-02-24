const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const autoPrefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
// const uglufy = require('uglify')
// const postcss    = require('gulp-postcss')
// const sourcemaps = require('gulp-sourcemaps')
//var cleanCSS = require('gulp-clean-css');
// var concat = require('gulp-concat');
// var bless = require('gulp-bless');

const DEST_PATH = "dist/responsive-web-design";

const html = () => {
  return gulp
    .src("responsive-web-design/**/**/*.html")
    .pipe(gulp.dest(DEST_PATH));
};

const styles = () => {
  return gulp
    .src("responsive-web-design/**/src/styles/**/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed", // compiles SASS to CSS
      })
    )
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest(path.join(DEST_PATH)))
    .pipe(browserSync.stream()); // tells task which directory to output compiled CSS [optional]
};

const scripts = () => {
  return gulp
    .src([
      // The order that you list the files in this array IS IMPORTANT!!
      "responsive-web-design/**/src/scripts/**/*.js",
    ])
    .pipe(gulp.dest(DEST_PATH)); // tells task which directory to outputs uglified (minified) scripts.min.js
};

const images = () => {
  return gulp
    .src("responsive-web-design/**/src/assets/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(DEST_PATH));
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("responsive-web-design/**/src/styles/**/*.scss", styles); // Watch the sass files for changes
  gulp
    .watch("responsive-web-design/**/**/*.html", html)
    .on("change", browserSync.reload); // Watch the JS files for changes
  gulp
    .watch("responsive-web-design/**/src/scripts/**/*.js", scripts)
    .on("change", browserSync.reload); // Watch the JS files for changes
  gulp
    .watch("responsive-web-design/**/src/assets/**/*", images)
    .on("change", browserSync.reload); // Watch the image files for changes
};

exports.default = gulp.series(
  gulp.parallel(html, styles, images, scripts),
  watch
);
