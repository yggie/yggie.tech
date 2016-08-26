import Path from 'path'
import md5File from 'md5-file'
import through from 'through2'
import renderFileAsPage from './render-file-as-page.js'

export default function renderPipeline(options) {
  const assets = buildAssetsObject(options)

  return through.obj((file, enc, callback) => {
    const page = renderFileAsPage(file.path, assets)

    const extname = Path.extname(file.path)
    const basename = Path.basename(file.path, extname)
    const dirname = Path.dirname(file.path)

    file.path = Path.join(dirname, `${basename}.html`)

    file.contents = new Buffer(page.html)

    callback(null, file)
  })
}

function buildAssetsObject(options) {
  return {
    globalStylesheet: cacheBustedPath(options.globalStylesheet),
  }

  function cacheBustedPath(assetPath) {
    const cacheBuster = md5File.sync(`${options.buildDir}/${assetPath}`)

    return `${assetPath}?${cacheBuster}`
  }
}
