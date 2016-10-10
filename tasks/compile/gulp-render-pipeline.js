import path from 'path'
import VinylFile from 'vinyl'
import md5File from 'md5-file'
import through from 'through2'
import renderFileAsPage from './render-file-as-page.jsx'

export default function renderPipeline(inputOptions) {
  const options = {
    root: 'index',
    ...inputOptions,
    cdnPaths: parseCdnDependencies(inputOptions),
  }
  const assets = buildAssetsObject(options)

  return through.obj(function render(file, enc, callback) {
    try {
      const page = renderFileAsPage(file.path, assets, options)

      const extname = path.extname(file.path)
      const basename = path.basename(file.path, extname).replace(/-page$/, '')
      const baseDirectory = path.dirname(file.path)
      const isErrorPage = basename.match(/^\d/)
      const shouldBeInRoot = basename === options.root || isErrorPage
      const filename = isErrorPage ? `${basename}.html` : 'index.html'
      const directory = shouldBeInRoot ?
        baseDirectory :
        path.join(baseDirectory, basename)

      this.push(new VinylFile({
        base: file.base,
        path: path.join(directory, filename),
        contents: new Buffer(page.html),
      }))

      callback(null)
    } catch (e) {
      callback(e)
    }
  })
}

function buildAssetsObject(options) {

  return {
    scripts: [options.cdnPaths.requirejs],
    cdnPaths: options.cdnPaths,
    globalStylesheet: cacheBustedPath(
      options.globalStylesheet,
      options.buildDir,
    ),
  }
}

function cacheBustedPath(assetPath, assetDir) {
  const cacheBuster = md5File.sync(path.join(assetDir, assetPath))

  return `${assetPath}?${cacheBuster}`
}

function parseCdnDependencies(options) {
  const replacement = (options.env === 'production') ? '.min.js' : '.js'

  return Object.keys(options.cdnPaths).reduce((obj, key) => {
    obj[key] = options.cdnPaths[key].replace(/\.js$/, replacement)

    return obj
  }, {})
}
