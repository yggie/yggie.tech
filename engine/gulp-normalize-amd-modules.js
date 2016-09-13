import path from 'path'
import through from 'through2'

const AMD_DEPS_REGEX = /^define\(([^\[]*)\[([^\]]*)\]/
const MODULE_NAMES_REGEX = /(\'(?:\.\/|\.\.\/)[^']+\'|\"(?:\.\/|\.\.\/)[^"]+\")/
const LOCAL_MODULE_REGEX = /^['"]\./

export default function gulpNormalizeAMDModules() {
  return through.obj((file, enc, callback) => {
    const moduleName = path.relative(file.base, file.path)
      .replace(path.extname(file.path), '')
    let contents = String(file.contents)

    let depsAsString = contents.match(AMD_DEPS_REGEX)[2]

    depsAsString = depsAsString.replace(MODULE_NAMES_REGEX, (depString) => {
      if (depString.match(LOCAL_MODULE_REGEX)) {
        const depStringWithoutQuotes = depString
          .replace(/^['"]/, '')
          .replace(/['"]$/, '')

        const depPath = path.join(
          path.dirname(file.path),
          depStringWithoutQuotes,
        )

        const depModuleName = path.relative(file.base, depPath)
          .replace(path.extname(depPath), '')

        return JSON.stringify(depModuleName)
      } else {
        return depString
      }
    })

    contents = contents.replace(AMD_DEPS_REGEX, (fullMatch, partBeforeDeps) => {
      return `define(${partBeforeDeps}[${depsAsString}]`
    })
    contents = contents.replace(/^define\(/, `define("${moduleName}",`)

    file.contents = new Buffer(contents)

    callback(null, file)
  })
}
