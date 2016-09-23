import fs from 'fs'
import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import webserver from 'gulp-webserver'
import sourcemaps from 'gulp-sourcemaps'
import requireFresh from './require-fresh.js'

const WEB_DIR = 'web'
const BUILD_DIR = '_build'
const PAGES_DIR = `${WEB_DIR}/pages`
const ENGINE_DIR = 'engine'
const BUILD_JS_DIR = `${BUILD_DIR}/js`
const STYLESHEET_DIR = `${WEB_DIR}/global-stylesheets`
const SERVER_ONLY_DIR = `${WEB_DIR}/server-only`

gulp.task('default', ['watch'])

gulp.task('watch', ['dev-server'], () => {
  gulp.watch([
    `${STYLESHEET_DIR}/**/*.scss`,
    `${WEB_DIR}/**/*.{js,jsx}`,
    `${ENGINE_DIR}/**/*.{js,jsx}`,
  ], ['dev-render-pages'])
})

gulp.task('dev-server', ['dev-render-pages'], () => {
  return gulp.src(BUILD_DIR)
    .pipe(webserver({
      port: 5858,
      open: true,
    }))
})

gulp.task('dev-compile-scss', () => {
  return gulp.src(`${STYLESHEET_DIR}/app.scss`)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR))
})

gulp.task('dev-compile-jsx', () => {
  const normalizeAMDModules =
    requireFresh('./engine/gulp-normalize-amd-modules.js').default
  /* eslint-disable no-sync */
  const babelConfig = JSON.parse(fs.readFileSync('./.babelrc').toString())
  /* eslint-enable no-sync */

  return gulp.src([
    `${WEB_DIR}/**/*.{js,jsx}`,
    `!${SERVER_ONLY_DIR}/**/*`,
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      ...babelConfig,
      plugins: [
        ...babelConfig.plugins,
        ['transform-es2015-modules-amd', {}],
      ],
    }))
    .pipe(normalizeAMDModules())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_JS_DIR))
})

gulp.task('dev-render-pages', ['dev-compile-jsx', 'dev-compile-scss'], () => {
  const renderPipeline =
    requireFresh('./engine/gulp-render-pipeline.js').default

  return gulp.src(`${PAGES_DIR}/**/*.jsx`)
    .pipe(plumber())
    .pipe(renderPipeline({
      webDir: WEB_DIR,
      buildDir: BUILD_DIR,
      cdnPaths: {
        /* eslint-disable max-len */
        'preact': `https://cdnjs.cloudflare.com/ajax/libs/preact/${require('preact/package').version}/preact.js`,
        'requirejs': `https://cdnjs.cloudflare.com/ajax/libs/require.js/${require('requirejs').version}/require.js`,
        /* eslint-enable max-len */
      },
      globalStylesheet: 'app.css',
    }).on('error', console.error))
    .pipe(gulp.dest(BUILD_DIR))
})
