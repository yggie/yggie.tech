import preact from 'preact'
import BlogPostLayout from './blog-post-layout.jsx'

export default class DummyBlogPostOnePage extends preact.Component {
  render() {
    return (
      <BlogPostLayout pageTitle="Dummy blog post 1" className="home-page">
        <p>This is some random text</p>

        <p>Some more random text</p>
      </BlogPostLayout>
    )
  }
}
