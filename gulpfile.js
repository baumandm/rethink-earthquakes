var gulp = require('gulp'),
    gulpFilter = require('gulp-filter'),
    concat = require('gulp-concat'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    webpack = require('gulp-webpack');

var bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files');
    
var less = require('gulp-less'),
    concatCss = require('gulp-concat-css');

var react = require('gulp-react');

var nodemon = require('gulp-nodemon');

var webpackOptions = {
    //cache: true,
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony'},
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        //root: __dirname,
        modulesDirectories: ['bower_components', 'node_modules']
    }
}

gulp.task('bower-install', function (cb) {
    return bower();
});

gulp.task('bower', ['bower-install'], function () {

    var jsFilter = gulpFilter('*.js');
    var cssFilter = gulpFilter('*.css');
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js'))
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

gulp.task('clean', function (cb) {
    del([
        'dist/**',
    ], cb);
});

gulp.task('webpack', function () {
return gulp.src(['src/**/*.jsx', 'src/**/*.js'])
    .pipe(webpack(webpackOptions))
    .pipe(gulp.dest('./dist/js'));
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
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img'));
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
    gulp.watch(['./src/**/*.jsx', './src/**/*.js'], ['webpack']);
    gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('default', ['bower', 'webpack', 'html', 'fonts', 'images', 'server', 'watch']);
