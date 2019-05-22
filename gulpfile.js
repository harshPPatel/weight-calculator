// Importing Modules
const { series, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

// Source Paths
const javaScriptSource = './source/js/*.js';
const sassSource = './source/sass/**/*.scss';

// Dewstination Paths
const javaScriptDestination = './public/js/';
const sassDestination = './public/css/';

// Deveopment Process - JavaScript Task
function javaScriptDevlopmentBuild(cb) {
  return src(javaScriptSource)
    .pipe(concat('app.js'))
    .pipe(rename({
      extname: '.min.js',
    }))
    .pipe(dest(javaScriptDestination));
  cb();
}

// Production Process - JavaScript Task
function javaScriptProductionBuild(cb) {
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

function sassDevelopmentBuild(cb) {
  return src(sassSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(sassDestination));
  cb();
}

function sassProductionBuild(cb) {
  return src(sassSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ["cover 99.5%"],
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8',
    }))
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(dest(sassDestination));
  cb();
}

// Exporting Tasks
exports.build = series(javaScriptProductionBuild, sassProductionBuild);
exports.default = series(javaScriptDevlopmentBuild, sassDevelopmentBuild);
