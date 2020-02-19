var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
terser = require('gulp-terser'),
browserSync = require('browser-sync').create();

var baseFolder = "docs";


gulp.task('previewDist', function() {
    browserSync.init({
        server: {
            baseDir: baseFolder
        }
    });
});

gulp.task('deleteDistFolder', function() {
    return del("./" + baseFolder);
});


gulp.task('copyGeneralFiles', function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./" + baseFolder));

});

gulp.task('optimizeImages', function() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
           .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./' + baseFolder + '/assets/images'))
});

gulp.task('usemin', function() {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return terser()}]
        }))
        .pipe(gulp.dest("./" + baseFolder));
});

gulp.task('build', 
                    (gulp.series('deleteDistFolder', 'icons', 'styles', 'scripts', 'copyGeneralFiles','optimizeImages', 'usemin', 'previewDist'))
);
