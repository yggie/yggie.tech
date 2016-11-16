import preact from 'preact'
import BlogPostLayout from '../blog-post-layout.jsx'
import ContentContainer from '../../_layout/content-container.jsx'

export const PAGE_META = {
  title: 'Dummy blog post 5',
  fixtureData: {
    publishedDate: new Date(2014, 11, 13),
  },
}

export default class DummyBlogPostFivePage extends preact.Component {
  render() {
    return (
      <BlogPostLayout pageMetadata={PAGE_META} className="home-page">
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
