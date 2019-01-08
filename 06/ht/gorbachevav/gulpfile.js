const gulp = require("gulp"),
    babelify = require('babelify'),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    cssnano = require("gulp-cssnano"),
    concat = require('gulp-concat'),
    cached = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    browserSync = require('browser-sync').create()
;

gulp.task("copy", () => {
    return gulp.src("./src/index.html")
        .pipe(cached("copy"))
        .pipe(gulp.dest("./build"));
});

gulp.task("assets", () => {
    return gulp.src("./src/img/**/*.jpg")
        .pipe(cached("assets"))
        .pipe(gulp.dest("./build/img"));
});

gulp.task("styles", () =>{
    return gulp.src("./src/css/**/*.css")
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return{
                    title: "style",
                    message: err.message
                };
            })
        }))
        .pipe(cached("styles")) 
        .pipe(concat("main.css"))
        .pipe(cssnano())
        .pipe(gulp.dest("./build/css"));
});

gulp.task("build:js", () => {
    return browserify({
        entries: ["./src/js/index.js"]
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .on("error", notify.onError(err => {
        return {
            title: "scripts",
            message: err.message
        }
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./build/js"))
});


gulp.task('browser:sync', () => {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    browserSync.watch("./build/**/*.*").on("change", browserSync.reload);
});
gulp.task("watch", () =>{
    gulp.watch("./src/*.html", ["copy"]);
    gulp.watch("./src/img/**/*.jpg", ["assets"]);
    gulp.watch("./src/css/**/*.css", ["styles"]);
    gulp.watch("./src/js/**/*.js", ["build:js"]);
});

gulp.task("default", ["copy", "assets", "styles", "build:js", "watch", "browser:sync"]);