const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));

gulp.task('styles', () => {
  return gulp.src('assets/sass/*.scss')
    .pipe(sass({
      'sourcemap=none': true
    }))
    .pipe(gulp.dest('assets/css/'))
})

gulp.task('watch', () => {
  gulp.watch('assets/sass/**/*.scss', ['styles'])
})

// gulp.task('default', ['styles', 'watch']);

gulp.task('default', gulp.series('styles'))
