var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha');

gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

gulp.task('clean', function() {
    return gulp.src(['dist'], {read: false})
        .pipe(clean());
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist/assets/tmp-js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('test', function () {
    return gulp.src(['test/bootstrap.js', 'test/scripts/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
});

/**
 * Run tests while watching for file changes
 */
gulp.task('testw', function () {
    return gulp.watch(['src/scripts/**/*.js', 'test/scripts/**/*.js'], ['test']);
});
