var gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');


gulp.task('default', function() {
    // place code for your default task here
});

//HTML Templating
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

//Convert image types
const gm = require('gulp-gm');
gulp.task('gmImages', function() {
    gulp.src('raw-assets/images/*')

    .pipe(gm(function(gmfile) {
            return gmfile.setFormat('jpg');
        }, {
            imageMagick: true
        }))
        .pipe(gulp.dest('public/assets/images/'));
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
//move left over images
gulp.task('gmMisc', function() {
    gulp.src('raw-assets/*.{png,jpg}')
        .pipe(gulp.dest('public/assets/'));
});

/////Image Resizing and file conversion
const responsive = require('gulp-responsive');
gulp.task('images', function() {
    return gulp.src('raw-assets/images/*')
        .pipe(gm(function(gmfile) {
            return gmfile.setFormat('jpg');
        }, {
            imageMagick: true
        }))
        .pipe(responsive({
            // Resize all JPG images to two different sizes: 30% and 50%
            '*.jpg': [{
                width: "50%",
                rename: {
                    suffix: '-small'
                },
            }, {
                width: "70%",
                rename: {
                    suffix: '-medium'
                },
            }, {
                // Compress, strip metadata, and rename original image
                // rename: {
                //     suffix: '-original'
                // },
            }],
        }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 100,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
        }))
        .pipe(gulp.dest('public/assets/images/'));
});
