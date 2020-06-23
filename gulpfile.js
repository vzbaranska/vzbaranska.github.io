const gulp = require('gulp');
const sass= require('gulp-sass');
sass.compiler = require('node-sass');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minImage = require('gulp-imagemin');
const minJs = require('gulp-js-minify');
const browserSync = require('browser-sync').create();


function copyHtml() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({ stream: true }));
}

function buildScss() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer ({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
}

function copyImg() {
    return gulp.src('./src/img/**')
        .pipe(minImage())
        .pipe(gulp.dest('./dist/img'))

}

function copyJs() {
    return gulp.src('./src/js/script.js')
        .pipe(minJs('/*.js'))
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./dist/js'))
}

function emptyDist() {
    return del('./dist/**')
}

const build = gulp.series(
    emptyDist,
    gulp.parallel(
        gulp.series(copyHtml , buildScss),
        copyImg,
        copyJs
    )
);

function dev() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch(['./src/index.html'], copyHtml);
    gulp.watch(['./src/scss/*.scss'], buildScss);
    gulp.watch(['./src/js/*.js'], copyJs);
}
exports.html = copyHtml;
exports.scss = buildScss;
exports.images = copyImg;
exports.clear = emptyDist;
exports.js = copyJs;
exports.build = build;
exports.dev = dev;


