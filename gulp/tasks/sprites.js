var gulp = require('gulp');
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
           render: {
               css: {
                    template: './gulp/templates/sprite.css'
               }
           }
        }
    }
}

gulp.task('beginClean', function() {
    return del(['./app/temp/sprite', './app/assets/images/sprites'])

});

gulp.task('createSprite', function() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite'));


});

gulp.task('copySpriteGraphic', function() {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('app/assets/images/sprites'));

});

gulp.task('copySpriteCSS', function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));

});

gulp.task ('endClean', function() {
    return del('./app/temp/sprite');
});


gulp.task('icons', 
                    (gulp.series('beginClean', 'createSprite','copySpriteGraphic', 'copySpriteCSS', 'endClean'))
);