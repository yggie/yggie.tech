import preact from 'preact'
import metadata from '@metadata'
import Container from './_layout/container.jsx'
import PrimaryLayout from './_components/primary-layout.jsx'

export default class BlogPage extends preact.Component {
  render() {
    return (
      <PrimaryLayout pageTitle="My Blog" className="blog-page">
        <Container>
          <h1>This is the blog page!</h1>

          <p>Various links to all those bloggy goodness:</p>

          <ul>
            {(this.blogPosts.map((entry) => {
              return (
                <li>
                  <a href={`/blog/${entry.subpath}`}>
                    {entry.title}
                  </a>
                </li>
              )
            }))}
          </ul>
        </Container>
      </PrimaryLayout>
    )
  }

  constructor() {
    super()

    const allBlogs = metadata.blogs.all.slice(0).map((rawEntry) => {
      return {
        ...rawEntry,
        publishedDate: formatDate(rawEntry.publishedDate),
      }
    })

    this.blogPosts = allBlogs.sort((a, b) => {
      const inf = Number.POSITIVE_INFINITY
      const aTime = a.publishedDate ? a.publishedDate.getTime() : inf
      const bTime = b.publishedDate ? b.publishedDate.getTime() : inf

      if (aTime > bTime) {
        return 1
      } else if (aTime < bTime) {
        return -1
      } else {
        return 0
      }
    })
  }
}

function formatDate(dateString) {
  return dateString ? new Date(dateString) : null
}
