import preact from 'preact'
import site from './site.js'
import PrimaryLayout from './_components/primary-layout.jsx'
import ContentContainer from './_layout/content-container.jsx'

export default class BlogPage extends preact.Component {
  render() {
    return (
      <PrimaryLayout pageTitle="My Blog" className="blog-page">
        <ContentContainer>
          <h1>This is the blog page!</h1>

          <p>Various links to all those bloggy goodness:</p>

          <ul>
            {(this.site.blogPosts().map((post) => {
              return (
                <li>
                  <a href={`/blog/${post.subpath()}`}>
                    {post.title()}
                  </a>
                </li>
              )
            }))}
          </ul>
        </ContentContainer>
      </PrimaryLayout>
    )
  }

  constructor() {
    super()

    this.site = site
  }
}
