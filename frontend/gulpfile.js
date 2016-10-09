const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
//const tscConfig = typescript.createProject('./tsconfig.json', { noResolve: true });
const tscConfig = typescript.createProject('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
 
var replace = require('gulp-replace-task')
    , args = require('yargs').argv
    , fs = require('fs');
 
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css'); // or use csso or nano instead
 
gulp.task('build', ['compile', 'copy:libs', 'copy:assets', 'bootstrap:compileLess', 'env']);
gulp.task('default', ['build']);
 
// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});
 
// TypeScript compile
gulp.task('compile', [], function () {
    //    return gulp
    //            .src(['src/**/*.ts'])
    return tscConfig.src()
        .pipe(sourcemaps.init())          // <--- sourcemaps
        .pipe(tscConfig())
        .pipe(sourcemaps.write('.'))      // <--- sourcemaps
        .pipe(gulp.dest('dist/'));
});
 
// copy dependencies
gulp.task('copy:libs', ['bootstrap:assets'], function () {
    return gulp.src([
        'node_modules/@(systemjs)/dist/system-polyfills.+(js|js.map)',
        'node_modules/@(systemjs)/dist/system.src.+(js|js.map)',
        'node_modules/@(@angular)/**/*.+(js|js.map)',
        'node_modules/@(rxjs)/**/*.+(js|js.map)',
        'node_modules/@(core-js)/client/shim.min.+(js|js.map)',
        'node_modules/@(zone.js)/dist/zone.+(js|js.map)',
        'node_modules/@(reflect-metadata)/Reflect.+(js|js.map)',
        'node_modules/@(jquery)/dist/*.+(js|js.map)'
    ])
        .pipe(gulp.dest('dist/lib'));
});
 
// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function () {
    return gulp.src(['src/**/*', '!src/**/*.ts'], { base: 'src/' })
        .pipe(gulp.dest('dist'));
});
 
/**
 * Watch non typescript compiled files and copy them into the dist folder on change
 */
gulp.task('watch:assets', function () {
    return gulp.watch(['src/**/*', '!src/**/*.ts'], function (obj) {
        console.log('File ' + obj.path + ' was ' + obj.type + ', running tasks...');
 
        // copy changed files only
        return gulp.src(obj.path, { "base": "src/" })
            .pipe(gulp.dest('dist'));
    });
});
 
/**
 * Configure environment
 */
gulp.task('env', function () {
    // Get the environment from the command line or use default
    var env = args.env || 'dev';
 
    // Read the settings from the right file
    var filename = 'env.config.' + env + '.json';
    var settings = JSON.parse(fs.readFileSync('config/' + filename, 'utf8'));
 
    console.log(settings)
 
    // Replace each placeholder with the correct value for the variable.
    return gulp.src('config/environment.ts')
        .pipe(replace({
            patterns: [
                {
                    match: 'backend',
                    replacement: settings.backend
                }
            ]
        }))
        .pipe(gulp.dest('src/app/'));
});
 
// copy fonts relative to the styles file
gulp.task('bootstrap:copyFonts', function () {
    return gulp.src(['node_modules/bootstrap-less/@(fonts)/*',])
        .pipe(gulp.dest('dist/styles'));
});
 
gulp.task('bootstrap:copyJs', function () {
    return gulp.src(['node_modules/@(bootstrap-less)/js/bootstrap.min.js',])
        .pipe(gulp.dest('dist/lib'));
});
 
gulp.task('bootstrap:assets', ['bootstrap:copyJs', 'bootstrap:copyFonts']);
 
gulp.task('bootstrap:compileLess', function () {
    return gulp.src('./less/**/*.less')
        // in case of multiple files concact them into a single one
        // .pipe(concat('boot.css'))
        .pipe(less({
            // add lib to less path thus its easier to import in less file
            paths: [
                '.',
                'node_modules/bootstrap-less'
            ]
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/styles'));
});
 
// watch less files and recompile
gulp.task('watch:less', function () {
    gulp.watch(['./less/**/*.less'],
        ['bootstrap:compileLess']);
});