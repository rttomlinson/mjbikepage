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
