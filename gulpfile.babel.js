import gulp from 'gulp'
import server from 'gulp-server-livereload'
import CompileTasks from './tasks/compile-tasks.js'
import PublishTasks from './tasks/publish-tasks.js'

const WEB_DIR = `${__dirname}/web`
const APP_DIR = `${WEB_DIR}/app`
const BLOGS_DIR = `${APP_DIR}/blog`
const BUILD_DIR = `${__dirname}/_build`
const TASKS_DIR = `${__dirname}/tasks`
const ASSETS_DIR = `${BUILD_DIR}/assets`
const BUILD_JS_DIR = `${ASSETS_DIR}/js`
const BUILD_CSS_DIR = `${ASSETS_DIR}/css`
const STYLESHEET_DIR = `${WEB_DIR}/global-stylesheets`
const PUBLISHED_METADATA_PATH = `${__dirname}/metadata.js`

gulp.task('default', ['server'])

const compileTasks = new CompileTasks({
  source: {
    publishedMetadata: PUBLISHED_METADATA_PATH,
    js: {
      web: WEB_DIR,
      root: APP_DIR,
      blogs: BLOGS_DIR,
      tasks: TASKS_DIR,
    },
    css: {
      root: STYLESHEET_DIR,
    },
  },
  output: {
    js: BUILD_JS_DIR,
    css: BUILD_CSS_DIR,
    root: BUILD_DIR,
  },
})
gulp.task('watch', [compileTasks.watch])
gulp.task('build', [compileTasks.default])

const publishTasks = new PublishTasks({
  compileParams: compileTasks.params,
})
gulp.task('publish', [publishTasks.default])

gulp.task('server', ['watch'], () => {
  return gulp.src(BUILD_DIR)
    .pipe(server({
      port: 5858,
      open: false,
      directoryListing: false,
      livereload: {
        enable: true,
        port: 32767,
        filter: (filepath, callback) => {
          callback(filepath.includes(compileTasks.livereloadSignal))
        },
      },
    }))
})
