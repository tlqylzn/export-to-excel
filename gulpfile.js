const gulp = require('gulp');

// Release tasks
require('./scripts/release.js');

// Build tasks
require('./scripts/build.js');

gulp.task('default', ['transpile']);
