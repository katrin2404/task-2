const gulp = require('gulp');
const inject = require('gulp-inject');
const concat = require('gulp-concat');
const favicons = require("gulp-real-favicon");
const jsonFormat = require('gulp-json-format');
const templateCache = require('gulp-angular-templatecache');
const concatCss = require('gulp-concat-css');
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');


const conf = {
  src: './src/',
  dist: './dist/',
  favIcon: [
    './src/*.ico'
  ],
  js: [
    './src/**/search.module.js',
    './src/**/pagination.module.js',
    './src/**/user-detail.module.js',
    './src/**/post-detail.module.js',
    './src/**/result-of-query.module.js',
    './src/app.module.js',
    './src/**/*.js',
  ],
  json: [
    './src/search/results/resultOfQuery.json'
  ],
  jsExternal: [
    './node_modules/angular/angular.js',
    './node_modules/angular-animate/angular-animate.js',
    './node_modules/angular-aria/angular-aria.js',
    './node_modules/angular-material/angular-material.js',
    './node_modules/angular-sanitize/angular-sanitize.js',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
    './node_modules/ui-router-page-title/page-title.js',
  ],
  cssExternal: [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/angular-material/angular-material.css',
  ],
  css: [
    './src/styles/**/*.css',
  ],
  templates: [
    './src/**/*.template.html',
  ]
};

gulp.task('templates', function () {
  return gulp.src(conf.templates)
    .pipe(templateCache('templates.js', {module: 'search'}))
    .pipe(gulp.dest(conf.dist));
});

gulp.task("favIcon", function () {
  return gulp.src(conf.favIcon)
    .pipe(gulp.dest(conf.dist));
});

gulp.task('clean', () => {
  return gulp
    .src([
      conf.dist + '**/*',
      conf.dist + '!.gitkeep',
    ])
    .pipe(clean());
});


/**
 * Concat and copy all js source files
 */
gulp.task('js', () => {
  return gulp
    .src(conf.js)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(conf.dist));
});

/**
 * Concat and copy all json source files
 */
gulp.task('json', () => {
  return gulp
    .src(conf.json)
    .pipe(jsonFormat(4))
    .pipe(gulp.dest(conf.dist));
});

/**
 * Copy all external libraries from node_modules
 */
gulp.task('external-js', () => {
  return gulp
    .src(conf.jsExternal)
    .pipe(gulp.dest(conf.dist));
});

/**
 * Concat and copy all css source files
 */
gulp.task('css', () => {
  return gulp
    .src(conf.css)
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest(conf.dist));
});

/**
 * Copy all external css from node_modules
 */
gulp.task('external-css', () => {
  return gulp
    .src(conf.cssExternal)
    .pipe(gulp.dest(conf.dist));
});

/**
 * Copy src index html file
 */
gulp.task('html', () => {
  return gulp
    .src(conf.src + 'index.html')
    .pipe(gulp.dest(conf.dist));
});


/**
 * Inject js and css files into primary html file
 */
gulp.task('inject', ['html'], () => {
  const target = gulp.src(conf.dist + 'index.html');
  const sources = gulp.src([conf.dist + 'bundle.js', conf.dist + 'templates.js', conf.dist + '**/*.css',]);

  return target
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(conf.dist));
});

/**
 * Build app
 */
gulp.task('build', gulpSequence('clean', ['favIcon', 'js', 'json', 'external-js', 'templates', 'css', 'external-css'], 'inject'));

gulp.task('server', ['build'], () => {
  return gulp.src(conf.dist)
    .pipe(webserver({
      port: 63343,
      livereload: true,
      open: true,
      fallback: 'index.html',
    }));
});

gulp.task('watch-js', () => {
  return gulp.watch([...conf.js, ...conf.templates], ['js']);
});

gulp.task('watch-css', () => {
  return gulp.watch(conf.css, ['css']);
});

gulp.task('watch-html', () => {
  return gulp.watch(conf.src + 'index.html', ['inject']);
});

gulp.task('dev-server', gulpSequence('server', ['watch-js', 'watch-css', 'watch-html']));
