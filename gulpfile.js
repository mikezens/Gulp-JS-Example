// Directory
var assetsDir = 'assets/',
    assetsDirSrc = './src/',
    assetsDirBuild = './build/',
    assetsDirJs = 'js/',
    assetsDirSass = 'sass/',
    assetsDirCss = 'css/',
    assetsDirImg = 'img/';


// Include gulp and plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify')
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin');
    

// Lint JS
gulp.task('lint', function() {
    return gulp.src(assetsDirSrc+assetsDir+assetsDirJs+'**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(assetsDirSrc+assetsDir+assetsDirJs+'**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest(assetsDirBuild+assetsDir+assetsDirJs))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assetsDirBuild+assetsDir+assetsDirJs));
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(assetsDirSrc+assetsDir+assetsDirSass+'*.scss')
        .pipe(sass())
        .pipe(gulp.dest(assetsDirSrc+assetsDir+assetsDirCss));
});


// Minify CSS
gulp.task('minify-css', function() {
    gulp.src(assetsDirSrc+assetsDir+assetsDirCss+'**/*.css')
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest(assetsDirBuild+assetsDir+assetsDirCss));
});


// Minify HTML
gulp.task('minify-html', function() {
    gulp.src(assetsDirSrc+'/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(assetsDirBuild))
});


// Images
gulp.task('imagemin', function () {
    gulp.src(assetsDirSrc+assetsDir+assetsDirImg+'**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(assetsDirBuild+assetsDir+assetsDirImg));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(assetsDirSrc+assetsDir+assetsDirJs+'**/*.js', ['lint', 'scripts']);
    gulp.watch(assetsDirSrc+assetsDir+assetsDirSass+'**/*.scss', ['sass']);
    gulp.watch(assetsDirSrc+assetsDir+assetsDirCss+'/**/*.css', ['minify-css']);    
    gulp.watch(assetsDirSrc+'/*.html', ['minify-html']);
    gulp.watch(assetsDirSrc+assetsDir+assetsDirImg+'/**/*', ['imagemin']);
});


// Default Task
gulp.task('default', ['lint', 'scripts', 'sass', 'minify-css', 'minify-html', 'imagemin', 'watch']);