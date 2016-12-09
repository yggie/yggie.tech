import preact from 'preact'
import BlogPostLayout from '../blog-post-layout.jsx'
import ContentContainer from '../../_layout/content-container.jsx'

export const PAGE_META = {
  title: 'Dummy blog post 6',
  fixtureData: {
    publishedDate: new Date(2014, 11, 23),
  },
}

export default class DummyBlogPostSixPage extends preact.Component {
  render() {
    const { site } = this.props

    return (
      <BlogPostLayout pageMetadata={PAGE_META} site={site}>
        <ContentContainer>
            <h1>H1 Heading</h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.
            </p>

            <h2>H2 Heading</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.
            </p>
        </ContentContainer>
      </BlogPostLayout>
    )
  }
}
