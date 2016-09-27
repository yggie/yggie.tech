import path from 'path'

export default function moduleName({ base, filepath }) {
  return path.relative(base, filepath).replace(path.extname(filepath), '')
}
