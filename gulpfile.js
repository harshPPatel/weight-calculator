// Importing Modules
const { series, src, dest, watch } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
sass.compiler = require('node-sass');

// Source Paths
const javaScriptSource = './source/js/*.js';
const vendorJavaScriptSource = './source/js/vendors/*.js';
const sassSource = './source/sass/**/*.scss';
const vendorCssSource = './source/css/*.css';
const faviconSource = './source/favicon/*';
const htmlSource = './source/*.html';

// Dewstination Paths
const javaScriptDestination = './public/js/';
const vendorJavaScriptDestination = './public/js/vendors/';
const sassDestination = './public/css/';
const vendorCssDestination = './public/css/vendors/';
const faviconDestination = './public/';
const htmlDestination = './public/';

// Development Build - HTML task
function htmlDevelopmentBuild(cb) {
  return src(htmlSource)
    .pipe(dest(htmlDestination));
  cb();
}

// Production Build - HTML task
function htmlProductionBuild(cb) {
  return src(htmlSource)
  .pipe(htmlmin({
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    collapseInlineTagWhitespace: true,
  }))
    .pipe(dest(htmlDestination));
  cb();
}

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
  watch(htmlSource, htmlDevelopmentBuild);
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
exports.default = series(htmlDevelopmentBuild, javaScriptDevlopmentBuild, sassDevelopmentBuild, vendorCss, vendorJavaScript, favicon);

// Production Build Task
exports.build = series(htmlProductionBuild, javaScriptProductionBuild, sassProductionBuild, vendorCss, vendorJavaScript, favicon);

// Watch Task
exports.watch = series(htmlDevelopmentBuild, javaScriptDevlopmentBuild, sassDevelopmentBuild, vendorCss, vendorJavaScript, watchTask);
