const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

// Clean scripts transpiled before
gulp.task('clean-transpiled', function() {
    return gulp.src('lib/**/*.js')
        .pipe(clean());
});

// Transpile ES6 -> ES5
gulp.task('transpile', ['clean-transpiled'], function() {
    return gulp.src([
        'src/**/*.js'
    ])
        .pipe(babel())
        .pipe(gulp.dest('lib'))
});
