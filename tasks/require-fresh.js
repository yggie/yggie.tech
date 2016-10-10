import decache from 'decache'

// a simple wrapper ensure we always obtain a fresh copy of the file contents by
// getting around the require cache
export default function requireFresh(filepath) {
  decache(filepath)

  return require(filepath)
}
