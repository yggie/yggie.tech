import path from 'path'
import md5File from 'md5-file'
import through from 'through2'
import renderFileAsPage from './render-file-as-page.js'

export default function renderPipeline(inputOptions) {
  const options = {
    ...inputOptions,
    cdnPaths: parseCdnDependencies(inputOptions),
  }
  const assets = buildAssetsObject(options)

  return through.obj((file, enc, callback) => {
    try {
      const page = renderFileAsPage(file.path, assets, options.webDir)

      const extname = path.extname(file.path)
      const basename = path.basename(file.path, extname)
      const dirname = path.dirname(file.path)

      file.path = path.join(dirname, `${basename}.html`)

      file.contents = new Buffer(page.html)

      callback(null, file)
    } catch (e) {
      callback(e)
    }
  })
}

function buildAssetsObject(options) {
  const filteredCdnPaths = Object.keys(options.cdnPaths).filter((key) => {
    return key !== 'requirejs'
  }).reduce((acc, key) => {
    acc[key] = options.cdnPaths[key]

    return acc
  }, {})

  return {
    scripts: [options.cdnPaths.requirejs],
    cdnPaths: filteredCdnPaths,
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
