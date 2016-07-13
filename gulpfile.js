var gulp = require('gulp');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var pump = require('pump');
var pkg = require('./package');

gulp.task('uglify', function(cb) {
    pump([
            gulp.src('src/*.js'),
            uglify({
                preserveComments: 'some'
            }),
            replace(/<% VERSION %>/g, pkg.version),
            replace(/<% NAME %>/g, pkg.name),
            gulp.dest('dist')
        ],
        cb
    );
});