import preact from 'preact'
import BlogPostLayout from '../blog-post-layout.jsx'
import ContentContainer from '../../_layout/content-container.jsx'

export const PAGE_META = {
  title: 'Dummy blog post 1',
  fixtureData: {},
}

export default class DummyBlogPostOnePage extends preact.Component {
  render() {
    const { site } = this.props

    return (
      <BlogPostLayout pageMetadata={PAGE_META} site={site}>
        <ContentContainer>
          <p>This is some random text</p>

          <p>Some more random text</p>
        </ContentContainer>
      </BlogPostLayout>
    )
  }
}
