var gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');


gulp.task('default', function() {
    // place code for your default task here
});


gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('pages/**/*.+(html|nunjucks)')
        .pipe(data(function() {
            return require('./data.json');
        }))
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('./public'));
});

const imagemin = require('gulp-imagemin');

gulp.task('imagemin', () =>
    gulp.src('raw-assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/'))
);

const gm = require('gulp-gm');

gulp.task('gmImages', function() {
    gulp.src('raw-assets/images/*')

    .pipe(gm(function(gmfile) {

        return gmfile.setFormat('jpg');

    }, {
        imageMagick: true
    }))
    .pipe(gulp.dest('public/assets/'));
});

gulp.task('gmLogos', function() {
    gulp.src('raw-assets/logos/*')

    .pipe(gm(function(gmfile) {

        return gmfile.setFormat('png');

    }, {
        imageMagick: true
    }))
    .pipe(gulp.dest('public/assets/'));
});
