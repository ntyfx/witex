var gulp = require('gulp');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var pump = require('pump');
var pkg = require('./package');
var rename = require("gulp-rename");

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
gulp.task('src', function(cb) {
    pump([
            gulp.src('src/index.js'),
            replace(/<% VERSION %>/g, pkg.version),
            replace(/<% NAME %>/g, pkg.name),
            rename("index.src.js"),
            gulp.dest('dist')
        ],
        cb
    );
});