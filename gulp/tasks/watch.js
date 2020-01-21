var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('cssInject', function() {
    return gulp.src('./app/temp/styles/styles.css')
  .pipe(browserSync.stream());
});

gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    
    watch('./app/index.html', function() {
    browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function(){
        gulp.series('styles', 'cssInject')();
    });

});
