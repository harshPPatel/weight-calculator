// Importing Modules
const { series, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// Source Paths
const javaScriptSource = './source/js/*.js';

// Dewstination Paths
const javaScriptDestination = './public/js/';

// Deveopment Process - JavaScript Task
function appJS(cb) {
  return src(javaScriptSource)
    .pipe(dest(javaScriptDestination));
  cb();
}

// Production Process - JavaScript Task
function compressJavaScript(cb) {
  return src(javaScriptSource)
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js',
    }))
    .pipe(dest(javaScriptDestination));
  cb();
}

// Exporting Tasks
exports.watch = series(something, nothing);
exports.build = series(compressJavaScript);
exports.default = series(appJS);
