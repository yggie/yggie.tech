import path from 'path'
import VinylFile from 'vinyl'
import through from 'through2'
import requireFresh from '../require-fresh.js'

export default function generateMetadata(name, { publish, publishedMetadata }) {
  let metadataBuffer = null

  return through.obj(bufferObjects, onEndStream)

  function bufferObjects(file, enc, callback) {
    if (metadataBuffer === null) {
      initializeMetaBuffer(file.base)
    }

    if (metadataBuffer.blogs[file.path]) {
      throw new Error(`Found multiple metadata entries for ${file.path}`)
    }

    const subpath = path.relative(metadataBuffer.base, file.path)
      .replace(`-page${path.extname(file.path)}`, '')
    const { PAGE_META } = requireFresh(file.path)
    const { title, fixtureData } = PAGE_META

    const entry = {
      ...fetchPublishedBlogEntry(metadataBuffer.published, subpath),
      title: title,
      subpath: subpath,
    }

    if (publish && !entry.publishedTime) {
      entry.publishedTime = (new Date()).toJSON()
    }

    if (!publish && fixtureData) {
      if (fixtureData.publishedDate) {
        entry.publishedTime = fixtureData.publishedDate.toJSON()
      }
    }

    metadataBuffer.blogs[file.path] = entry

    callback()
  }

  function onEndStream(callback) {
    const metadata = {
      blogs: {
        all: [],
      },
    }

    Object.keys(metadataBuffer.blogs).forEach((key) => {
      metadata.blogs.all.push(metadataBuffer.blogs[key])
    })

    this.push(new VinylFile({
      base: metadataBuffer.base,
      path: path.join(metadataBuffer.base, `${name}.json`),
      contents: new Buffer(JSON.stringify(metadata, null, 2)),
    }))

    metadataBuffer = null

    callback()
  }

  function initializeMetaBuffer(base) {
    let contents = null
    try {
      contents = requireFresh(publishedMetadata).default
    } catch(e) {
      // do nothing
    }
    metadataBuffer = {
      base: base,
      blogs: {},
      published: contents,
    }
  }
}

function fetchPublishedBlogEntry(published, subpath) {
  const repository = published ? published.blogs.all : []

  return repository.find((entry) => {
    return entry.subpath === subpath
  }) || {
    title: 'N/A',
    subpath: 'N/A',
    publishedTime: null,
  }
}
