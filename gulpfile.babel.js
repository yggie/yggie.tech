import del from 'del'
import gulp from 'gulp'
import server from 'gulp-server-livereload'
import CompileTasks from './tasks/compile-tasks.js'
import PublishTasks from './tasks/publish-tasks.js'

const WEB_DIR = `${__dirname}/web`
const APP_DIR = `${WEB_DIR}/app`
const BLOGS_DIR = `${APP_DIR}/blog`
const BUILD_DIR = `${__dirname}/_build`
const TASKS_DIR = `${__dirname}/tasks`
const STATIC_ASSETS_DIR = `${APP_DIR}/assets`
const BUILD_ASSETS_DIR = `${BUILD_DIR}/assets`
const BUILD_JS_DIR = BUILD_ASSETS_DIR
const BUILD_CSS_DIR = BUILD_ASSETS_DIR
const STYLESHEET_DIR = APP_DIR
const BUILD_ARTIFACTS_DIR = `${BUILD_DIR}/_artifacts`
const BUILD_STATIC_ASSETS_DIR = BUILD_ASSETS_DIR
const PUBLISHED_METADATA_PATH = `${__dirname}/metadata.json`

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
    assets: STATIC_ASSETS_DIR,
  },
  output: {
    js: BUILD_JS_DIR,
    css: BUILD_CSS_DIR,
    root: BUILD_DIR,
    assets: BUILD_STATIC_ASSETS_DIR,
    artifacts: BUILD_ARTIFACTS_DIR,
  },
})
gulp.task('watch', [compileTasks.watch])
gulp.task('build', [compileTasks.default])
gulp.task('clean', () => {
  del([BUILD_DIR])
})

const publishTasks = new PublishTasks({
  compileParams: compileTasks.params,
})
gulp.task('publish', [publishTasks.default])

gulp.task('server', ['watch'], () => {
  return gulp.src(BUILD_DIR)
    .pipe(server({
      port: 5858,
      open: false,
      log: 'debug',
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
