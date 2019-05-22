// Importing Modules
const { series, src, dest, watch } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
sass.compiler = require('node-sass');

// Source Paths
const javaScriptSource = './source/js/*.js';
const vendorJavaScriptSource = './source/js/vendors/*.js';
const sassSource = './source/sass/**/*.scss';
const vendorCssSource = './source/css/*.css';
const faviconSource = './source/favicon/*';

// Dewstination Paths
const javaScriptDestination = './public/js/';
const vendorJavaScriptDestination = './public/js/vendors/';
const sassDestination = './public/css/';
const vendorCssDestination = './public/css/vendors/';
const faviconDestination = './public/';

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

// Vendor JavaScript Task
function vendorJavaScript(cb) {
  return src(vendorJavaScriptSource)
    .pipe(dest(vendorJavaScriptDestination));
  cb();
}

// Development Process - Sass
function sassDevelopmentBuild(cb) {
  return src(sassSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(sassDestination));
  cb();
}

// Production Process - Sass
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

// Vendor Css Task
function vendorCss(cb) {
  return src(vendorCssSource)
    .pipe(dest(vendorCssDestination));
  cb();
}

// Favicon Tasks
function favicon(cb) {
  return src(faviconSource)
    .pipe(dest(faviconDestination));
  cb();
}

// Watch Task
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './public'
    },
    notify: false,
  });
  watch(sassSource, sassDevelopmentBuild);
  watch(javaScriptSource, javaScriptDevlopmentBuild);
  watch(vendorJavaScriptSource, vendorJavaScript);
  watch(vendorCssSource, vendorCss);
  watch(faviconSource, favicon);
  watch([
    './public/*',
    './public/js/*.js',
    './public/js/vendors/*.js',
    './public/css/*.css',
    './public/css/vendors/*.css',
  ]).on('change', browserSync.reload);;
}

// Exporting Tasks

// Default Task
exports.default = series(javaScriptDevlopmentBuild, sassDevelopmentBuild, vendorCss, vendorJavaScript, favicon);

// Production Build Task
exports.build = series(javaScriptProductionBuild, sassProductionBuild, vendorCss, vendorJavaScript, favicon);

// Watch Task
exports.watch = watchTask;
