var gulp = require("gulp");
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssNano = require("gulp-cssnano");
var concat = require("gulp-concat");
var inject = require("gulp-inject");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var wiredep = require('wiredep').stream;
var notify = require("gulp-notify");

//browsersynce to create local host
//Babel to turn es6 to es5 to work on all browsers
//reportError
//Nodemon - restart server

gulp.task("sass", () => {
  return gulp.src("assets/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("assets/styles"))
    .pipe(notify("Sass Updated"))
});

gulp.task("postCss", () => {
  var plugins = [
    autoprefixer({browsers: ["last 3 version"]}),
    cssNano()
  ];
  return gulp.src("assets/css/*.css")
    .pipe(postCss(plugins));
});

//On setup run Inject to add your files to the index.html

gulp.task("inject", () => {
  var target = gulp.src("index.html");
  var sources = gulp.src(["assets/scripts/*.js", "assets/styles/*.css"], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest("."));
});

gulp.task("wiredep", () => {
  gulp.src('index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('.'))
});

gulp.task("watch", () => {
  gulp.watch("assets/sass/*.scss", ["sass", "postCss"]);
  gulp.watch("bower.json", ["wiredep"]);
});

gulp.task("build", () => {
  //concat all plugins into here
  //concat all scripts you made into a scripts file
  //uglify both scripts
});