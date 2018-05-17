"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var build = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");
var pump = require("pump");
var normalize = require("postcss-normalize");

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(
      [autoprefixer()],
      [normalize(({ /* options */ }))]
    ))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html"), ["posthtml"];
});

gulp.task("jsmin", function (cb) {
  pump([
        gulp.src(["build/js/*.js", "build/!js/*.min.js"]),
        uglify(),
        rename({suffix: ".min"}),
        gulp.dest("build/js/")
    ],
    cb
  );
});

gulp.task("imagemin", function() {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("svgstore", function() {
  return gulp.src("build/img/{icon-vk-mobile,icon-insta-mobile,htmlacademy,icon-fb-mobile}.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("posthtml", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
      ]))
    .pipe(gulp.dest("build"));
});

gulp.task("picturefill", function() {
  return gulp.src([
      "node_modules/picturefill/dist/picturefill.js"
    ])
    .pipe(gulp.dest("build/js"));
});

gulp.task("copy", function() {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**/*.{png,jpg,svg}",
      "source/js/**/*.js"
      ], {
        base: "source"
      })
    .pipe(gulp.dest("build"));
});

gulp.task("del", function () {
  return del("build");
});

gulp.task("build", function(done) {
  build("del", "copy", "style", "picturefill", "jsmin", "svgstore", "posthtml", "imagemin", "webp",  done)
});
