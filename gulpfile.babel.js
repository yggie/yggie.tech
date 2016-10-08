import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import webserver from 'gulp-webserver'
import sourcemaps from 'gulp-sourcemaps'
import requireFresh from './require-fresh.js'

const WEB_DIR = 'web'
const APP_DIR = `${WEB_DIR}/app`
const BUILD_DIR = '_build'
const ASSETS_DIR = `${BUILD_DIR}/assets`
const ENGINE_DIR = 'engine'
const BUILD_JS_DIR = `${ASSETS_DIR}/js`
const BUILD_CSS_DIR = `${ASSETS_DIR}/css`
const JS_ASSETS_PATH = BUILD_JS_DIR.replace(`${BUILD_DIR}/`, '/')
const CSS_ASSETS_PATH = BUILD_CSS_DIR.replace(`${BUILD_DIR}/`, '/')
const STYLESHEET_DIR = `${WEB_DIR}/global-stylesheets`

gulp.task('default', ['watch'])

gulp.task('watch', ['server'], () => {
  gulp.watch([
    `${STYLESHEET_DIR}/**/*.scss`,
    `${WEB_DIR}/**/*.{js,jsx}`,
    `${ENGINE_DIR}/**/*.{js,jsx}`,
  ], ['render-html'])
})

gulp.task('server', ['render-html'], () => {
  return gulp.src(BUILD_DIR)
    .pipe(webserver({
      port: 5858,
      open: false,
    }))
})

gulp.task('compile-scss', ['clean-css'], () => {
  return gulp.src(`${STYLESHEET_DIR}/app.scss`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_CSS_DIR))
})

gulp.task('compile-jsx', ['clean-js'], () => {
  const normalizeAMDModules =
    requireFresh('./engine/gulp-normalize-amd-modules.js').default
  /* eslint-disable no-sync */
  const babelConfig = JSON.parse(fs.readFileSync('./.babelrc').toString())
  /* eslint-enable no-sync */

  return gulp.src([
    `${APP_DIR}/**/*.{js,jsx}`,
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

gulp.task('render-html', ['clean-html', 'compile-jsx', 'compile-scss'], () => {
  const renderPipeline =
    requireFresh('./engine/gulp-render-pipeline.js').default

  return gulp.src(`${APP_DIR}/**/*-page.jsx`)
    .pipe(plumber())
    .pipe(renderPipeline({
      appDir: APP_DIR,
      buildDir: BUILD_DIR,
      scriptPaths: JS_ASSETS_PATH,
      cdnPaths: {
        /* eslint-disable max-len */
        'preact': `https://cdnjs.cloudflare.com/ajax/libs/preact/${require('preact/package').version}/preact.js`,
        'requirejs': `https://cdnjs.cloudflare.com/ajax/libs/require.js/${require('requirejs').version}/require.js`,
        /* eslint-enable max-len */
      },
      globalStylesheet: `${CSS_ASSETS_PATH}/app.css`,
    }).on('error', console.error))
    .pipe(gulp.dest(BUILD_DIR))
})

gulp.task('clean-css', () => {
  return del([
    `${BUILD_JS_DIR}/**/*.{css,map}`,
  ])
})

gulp.task('clean-js', () => {
  return del([
    `${BUILD_JS_DIR}/**/*.{js,map}`,
  ])
})

gulp.task('clean-html', () => {
  return del([
    `!${ASSETS_DIR}/**/*`,
    `${BUILD_DIR}/**/*.html`,
  ])
})
