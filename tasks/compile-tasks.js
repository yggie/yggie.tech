import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import path from 'path'
import hash from 'object-hash'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import gulpif from 'gulp-if'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import sourcemaps from 'gulp-sourcemaps'
import { execSync } from 'child_process'
import requireFresh from './require-fresh.js'

const NAMESPACE = 'compile'

export default class CompileTasks {
  constructor(params) {
    const { publish, source, output } = params

    this.name = `${NAMESPACE}-${hash(params).substring(0, 3)}`
    this.css = `${this.name}:css`
    this.jsx = `${this.name}:jsx`
    this.html = `${this.name}:html`
    this.watch = `${this.name}:watch`
    this.metadata = `${this.name}:metadata`
    this.cleanJs = `${this.name}:clean-js`
    this.cleanCss = `${this.name}:clean-css`
    this.cleanHtml = `${this.name}:clean-html`
    this.signalLivereload = `${this.name}:livereload-signal`
    this.default = this.html
    this.params = params
    this.livereloadSignal = `livereload-${this.name}.signal.txt`

    gulp.task(this.watch, [this.html], () => {
      const basename = path.basename(source.publishedMetadata)
      const metaname = basename.replace(path.extname(basename), '')

      gulp.watch([
        `${source.css.root}/**/*.css`,
        `${source.js.web}/**/*.{css,js,jsx}`,
        `${source.js.tasks}/**/*.{js,jsx}`,
        // apparently order matters, keep the blacklist at the bottom!
        `!${source.js.root}/${metaname}.js`,
      ], [this.signalLivereload])
    })

    const livereloadSignal = this.livereloadSignal
    gulp.task(this.signalLivereload, [this.html], () => {
      execSync(`touch ${output.root}/${livereloadSignal}`)
    })

    gulp.task(this.html, [this.cleanHtml, this.jsx], () => {
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
        }).on('error', function onError() {
          console.log.call(console.log, arguments)
          this.emit('end')
        }))
        .pipe(gulp.dest(output.root))
    })

    gulp.task(this.css, [this.cleanCss], () => {
      return gulp.src([
        `${source.css.root}/app.css`,
        `${source.js.root}/**/*.css`,
      ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss(compact([
          require('postcss-import')(),
          require('postcss-modules')({
            getJSON(cssFilename, json) {
              if (cssFilename.includes('app.css')) {
                return
              }

              const relativeToRoot = path.relative(source.js.root, cssFilename)
              const filename = path.join(output.js, `${relativeToRoot}.json`)

              /* eslint-disable no-sync */
              fs.writeFileSync(filename, JSON.stringify(json))
              /* eslint-enable no-sync */
            },
          }),
          require('postcss-url')(),
          require('postcss-cssnext')({
            versions: 'last 2 versions > 10%',
          }),
          require('postcss-browser-reporter')(),
        ])))
        .pipe(concat('app.css'))
        .pipe(postcss(compact([
          require('css-mqpacker')(),
          ifpublish(require('cssnano')()),
        ])))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output.css))

      function compact(array) {
        return array.filter((item) => {
          return !!item
        })
      }

      function ifpublish(plugin) {
        return publish ? plugin : null
      }
    })

    gulp.task(this.jsx, [this.cleanJs, this.css, this.metadata], () => {
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
            ['inline-json-import', {}],
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
