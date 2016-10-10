import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import path from 'path'
import hash from 'object-hash'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import gulpif from 'gulp-if'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import requireFresh from './require-fresh.js'

const NAMESPACE = 'compile'

export default class CompileTasks {
  constructor(params) {
    const { publish, source, output } = params

    this.name = `${NAMESPACE}-${hash(params).substring(0, 3)}`
    this.jsx = `${this.name}:jsx`
    this.html = `${this.name}:html`
    this.scss = `${this.name}:scss`
    this.watch = `${this.name}:watch`
    this.metadata = `${this.name}:metadata`
    this.cleanJs = `${this.name}:clean-js`
    this.cleanCss = `${this.name}:clean-css`
    this.cleanHtml = `${this.name}:clean-html`
    this.default = this.html
    this.params = params

    gulp.task(this.watch, [this.html], () => {
      const basename = path.basename(source.publishedMetadata)
      const metaname = basename.replace(path.extname(basename), '')

      gulp.watch([
        `${source.css.root}/**/*.scss`,
        `${source.js.web}/**/*.{js,jsx}`,
        `${source.js.tasks}/**/*.{js,jsx}`,
        // apparently order matters, keep the blacklist at the bottom!
        `!${source.js.root}/${metaname}.js`,
      ], [this.html])
    })

    gulp.task(this.html, [this.cleanHtml, this.jsx, this.scss], () => {
      const renderPipeline =
        requireFresh('./compile/gulp-render-pipeline.js').default

      const scriptPaths = output.js.replace(`${output.root}/`, '/')
      const stylesheetPath = output.css.replace(`${output.root}/`, '/')

      return gulp.src(`${source.js.root}/**/*-page.jsx`)
        .pipe(plumber())
        .pipe(renderPipeline({
          appDir: source.js.root,
          buildDir: output.root,
          scriptPaths: scriptPaths,
          cdnPaths: {
            /* eslint-disable max-len */
            'preact': `https://cdnjs.cloudflare.com/ajax/libs/preact/${require('preact/package').version}/preact.js`,
            'requirejs': `https://cdnjs.cloudflare.com/ajax/libs/require.js/${require('requirejs').version}/require.js`,
            /* eslint-enable max-len */
          },
          globalStylesheet: `${stylesheetPath}/app.css`,
        }).on('error', console.error))
        .pipe(gulp.dest(output.root))
    })

    gulp.task(this.scss, [this.cleanCss], () => {
      return gulp.src(`${source.css.root}/app.scss`)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed',
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output.css))
    })

    gulp.task(this.jsx, [this.cleanJs, this.metadata], () => {
      const normalizeAMDModules =
        requireFresh('./compile/gulp-normalize-amd-modules.js').default
      /* eslint-disable no-sync */
      const babelConfig = JSON.parse(fs.readFileSync('./.babelrc').toString())
      /* eslint-enable no-sync */

      return gulp.src(`${source.js.root}/**/*.{js,jsx}`)
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
        .pipe(gulp.dest(output.js))
    })

    gulp.task(this.metadata, [], () => {
      const generateMetadata =
        requireFresh('./compile/generate-metadata.js').default
      const directory = path.dirname(source.publishedMetadata)
      const basename = path.basename(source.publishedMetadata)
      const filename = basename.replace(path.extname(basename), '')

      return gulp.src(`${source.js.blogs}/**/*-page.jsx`)
        .pipe(plumber())
        .pipe(generateMetadata(filename, {
          publish: publish,
          publishedMetadata: source.publishedMetadata,
        }))
        .pipe(gulp.dest(source.js.root))
        .pipe(gulpif(publish, gulp.dest(directory)))
    })

    gulp.task(this.cleanCss, () => {
      return del([
        `${output.css}/**/*.{css,map}`,
      ])
    })

    gulp.task(this.cleanJs, () => {
      return del([
        `${output.js}/**/*.{js,map}`,
      ])
    })

    gulp.task(this.cleanHtml, () => {
      return del([
        `${output.root}/**/*.html`,
      ])
    })
  }
}
