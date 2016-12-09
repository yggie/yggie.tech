import metadata from '@metadata'

export default createInstance(metadata)

function createInstance(instanceData) {
  class BlogPost {
    constructor(data) {
      this._raw = Object.assign({}, data)

      const dateString = this._raw.publishedTime
      this._publishedDate = dateString ? new Date(dateString) : null
    }

    title() {
      return this._raw.title
    }

    href() {
      return `/blog/${this._raw.subpath}`
    }

    wasPublished() {
      return !!this._publishedDate
    }

    publishedDate() {
      return this._publishedDate
    }
  }

  class SiteMetadata {
    constructor(data) {
      const posts = data.blogs.all.slice(0).map((raw) => {
        return new BlogPost(raw)
      })

      this._blogPosts = posts.sort((a, b) => {
        const inf = Number.POSITIVE_INFINITY
        const aTime = a.wasPublished() ? a.publishedDate().getTime() : inf
        const bTime = b.wasPublished() ? b.publishedDate().getTime() : inf

        if (aTime > bTime) {
          return 1
        } else if (aTime < bTime) {
          return -1
        } else {
          return 0
        }
      })
    }

    blogPosts() {
      return this._blogPosts
    }
  }

  return new SiteMetadata(instanceData)
}
