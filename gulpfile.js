/// <reference path="typings/tsd.d.ts" />

// Required plugins.
var ts = require('gulp-typescript'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    del = require('del'),
    concat = require('gulp-concat'),
    karma = require('karma').server;
   
// Create a new typescript project. 
var tsProject = ts.createProject({
    // Turn of declaration files
    declarationFiles: false,  
    
    // Target EcmaScript 6 for transpiling typescript sources.
    target: 'ES6',
    
    // Require the current version of typescript.
    typescript: require('typescript')
});

// Folder definitions.
var folders = {
    build: 'build',
    sourceFolder: 'source',
    source: 'source/**/*.ts',
    test: 'tests/**/*.js',
    coverageSource: 'coverageSource'
};

// Task to clean the build folder.
gulp.task('clean', function (cb) {
    del([folders.build, folders.coverageSource], cb);
});

// Task to build the files.
// It will transpile from TypeScript to ES6 using gulp-typescript.
// Then it will use gulp-babel (BabelJS) to transpile from ES6 to ES5, since the browsers don't support all ES6 features yet.
// After that, the output is concatenated into a single library file and outputted to the build folder
gulp.task('build', ['clean'], function () {
    // Transpile from TypeScript to ES6
    var tsResult = gulp.src(folders.source)
        .pipe(ts(tsProject));
        
    // use the result of the typescript compiler to transpile to ES5
    return tsResult.js
        .pipe(babel())
        // Output to coverageSource before concatenating
        //.pipe(gulp.dest(folders.coverageSource))
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(folders.build));
});

// Default gulp task
gulp.task('default', ['build']);

gulp.task('tests', ['build'], function (cb) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb);
});

// Watcher to automatically transpile when a file within the source folder changes
gulp.task('watch', ['build'], function () {
    gulp.watch(folders.source, ['build']);
});

// Continuous test execution
gulp.task('watch-tests', ['tests'], function () {
    gulp.watch([folders.source, folders.test], ['tests']);
});