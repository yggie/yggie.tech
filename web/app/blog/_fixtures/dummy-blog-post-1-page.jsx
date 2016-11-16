import preact from 'preact'
import BlogPostLayout from '../blog-post-layout.jsx'
import ContentContainer from '../../_layout/content-container.jsx'

export const PAGE_META = {
  title: 'Dummy blog post 1',
  fixtureData: {},
}

export default class DummyBlogPostOnePage extends preact.Component {
  render() {
    return (
      <BlogPostLayout pageMetadata={PAGE_META} className="home-page">
        <ContentContainer>
          <p>This is some random text</p>

          <p>Some more random text</p>
        </ContentContainer>
      </BlogPostLayout>
    )
  }
}
