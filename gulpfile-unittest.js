// Required plugins.
var ts = require('gulp-typescript'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    del = require('del'),
    concat = require('gulp-concat'),
    karma = require('karma').server;
   
var tsProject = ts.createProject({
    target: 'ES6',
    typescript: require('typescript')
});

var folders = {
    build: 'build',
    source: 'source/**/*.ts',
    test: 'tests/**/*.js',
};

gulp.task('clean', function (cb) {
    del([folders.build], cb);
});

gulp.task('build', ['clean'], function () {
    var tsResult = gulp.src(folders.source)
        .pipe(ts(tsProject));
        
    return tsResult.js
        .pipe(babel())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(folders.build));
});

gulp.task('default', ['build']);

gulp.task('tests', ['build'], function (cb) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb);
});

gulp.task('watch-tests', ['tests'], function () {
    gulp.watch([folders.source, folders.test], ['tests']);
});