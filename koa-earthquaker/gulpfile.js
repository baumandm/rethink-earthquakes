var gulp = require('gulp'),
    gulpFilter = require('gulp-filter'),
    flatten = require('gulp-flatten');

var bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files');
    
var less = require('gulp-less'),
    concatCss = require('gulp-concat-css');

var nodemon = require('gulp-nodemon');

gulp.task('bower-install', function (cb) {
    return bower();
});

gulp.task('bower', ['bower-install'], function () {

    var jsFilter = gulpFilter('*.js');
    var cssFilter = gulpFilter('*.css');
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(flatten())
        .pipe(gulp.dest('./dist/js/vendor'))
        .pipe(jsFilter.restore())

        .pipe(cssFilter)
        .pipe(flatten())
        .pipe(concatCss('vendor.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(cssFilter.restore())

        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('less', function () {
    gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(flatten())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function () {
    gulp.src(['./src/*.html', './src/favicon.ico'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('fonts', function () {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function () {
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'));
});


gulp.task('server', function () {
    nodemon({
        script: 'app.js',
        watch: ['app.js'],
        env: {
            PORT: 3050
        },
        nodeArgs: ['--harmony']
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.less', ['less']);
});

gulp.task('default', ['bower', 'html', 'fonts', 'images', 'less', 'server', 'watch']);
