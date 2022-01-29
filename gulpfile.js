const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const scss_dir = './protected/scss/';
const js_dir = './protected/js/';
const assets_dir = './assets';
const src_dir = './protected';


function appCss() {
    return gulp.src(scss_dir + 'app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assets_dir + '/css'));
}

function appJs() {
    return gulp.src(js_dir + '*.js')
        .pipe(concat('app.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(assets_dir + '/js'))
}

function watch() {
    gulp.watch(scss_dir, appCss);
    gulp.watch(js_dir, appJs);
}

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch([src_dir, 'index.html']).on("change", reload);
});

exports.css = gulp.parallel(appCss, /*pageCss*/);
exports.js = appJs;
exports.watch = watch;
exports.default = gulp.series(gulp.parallel(appCss, /*pageCss*/), appJs, watch);


