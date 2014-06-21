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
    console.log('tests are run by a script instead of gulp, use the following command: "./run-test"');
});