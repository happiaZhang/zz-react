/**
 * Copyright @2016-present, Sumscope, Inc.
 * All rights reserved.
 */

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () => {
  return gulp.src('src/**/*.js',
    { ignoreInitial: false })
    .pipe(babel({
      presets: ['es2015', 'stage-0', 'react']
    }))
    .pipe(gulp.dest('dist'));
});

