import gulp from 'gulp'
import sass from 'gulp-sass'
import webserver from 'gulp-webserver'
import renderPipeline from './engine/gulp-render-pipeline.js'

const WEB_DIR = 'web'
const BUILD_DIR = 'build'
const ENGINE_DIR = 'engine'
const STYLESHEET_DIR = 'web/stylesheets'

gulp.task('default', ['watch'])

gulp.task('watch', ['dev-server'], () => {
  gulp.watch([`${WEB_DIR}/**/*.{js,jsx}`, `${ENGINE_DIR}/**/*.{js,jsx}`], ['render-pages'])
})

gulp.task('dev-server', ['render-pages'], () => {
  return gulp.src(BUILD_DIR)
    .pipe(webserver({
      port: 5858,
      open: true,
    }))
})

gulp.task('compile-scss', () => {
  return gulp.src(`${STYLESHEET_DIR}/app.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR))
})

gulp.task('render-pages', ['compile-scss'], () => {
  return gulp.src(`${WEB_DIR}/pages/**/*.jsx`)
    .pipe(renderPipeline({
      buildDir: BUILD_DIR,
      globalStylesheet: 'app.css',
    }))
    .pipe(gulp.dest(BUILD_DIR))
})
