import path from 'path'
import through from 'through2'
import moduleName from './module-name.js'

const AMD_DEPS_REGEX = /^define\(([^\[]*)\[([^\]]*)\]/
const MODULES_REGEX = /(\'(?:\.\/|\.\.\/)[^']+\'|\"(?:\.\/|\.\.\/)[^"]+\")/g
const LOCAL_MODULE_REGEX = /^['"]\./

export default function gulpNormalizeAMDModules() {
  return through.obj((file, enc, callback) => {
    const fileModuleName = moduleName({
      base: file.base,
      filepath: file.path,
    })
    let contents = String(file.contents)

    const match = contents.match(AMD_DEPS_REGEX)
    if (!match) {
      callback(null, file)
      return
    }

    let depsAsString = match[2]

    depsAsString = depsAsString.replace(MODULES_REGEX, (depString) => {
      if (depString.match(LOCAL_MODULE_REGEX)) {
        const depStringWithoutQuotes = depString
          .replace(/^['"]/, '')
          .replace(/['"]$/, '')

        const depPath = path.join(
          path.dirname(file.path),
          depStringWithoutQuotes,
        )

        const depModuleName = moduleName({
          base: file.base,
          filepath: depPath,
        })

        return JSON.stringify(depModuleName)
      } else {
        return depString
      }
    })

    contents = contents.replace(AMD_DEPS_REGEX, (fullMatch, partBeforeDeps) => {
      return `define(${partBeforeDeps}[${depsAsString}]`
    })
    contents = contents.replace(/^define\(/, `define("${fileModuleName}",`)

    file.contents = new Buffer(contents)

    callback(null, file)
  })
}
