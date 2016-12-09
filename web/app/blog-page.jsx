import preact from 'preact'
import Timeline from './_components/timeline.jsx'
import PrimaryLayout from './_components/primary-layout.jsx'
import ContentContainer from './_layout/content-container.jsx'

export const PAGE_META = {
  title: 'My Blog',
}

export default class BlogPage extends preact.Component {
  constructor(props) {
    super(props)
    this.state = rebuildState(props)
  }

  render() {
    const { site } = this.props
    const { publishedBlogPosts, unpublishedBlogPosts: unpublished } = this.state

    return (
      <PrimaryLayout pageMetadata={PAGE_META} site={site}>
        {unpublished.length ? renderUnpublishedSection(unpublished) : null}

        <ContentContainer>
          <Timeline items={publishedBlogPosts}
            timestampFunction={(post) => post.publishedDate()}
            renderItem={(post) => {
              return (
                <a href={post.href()}>
                  {post.title()}
                </a>
              )
            }}/>
        </ContentContainer>
      </PrimaryLayout>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState(rebuildState(nextProps))
  }
}

function renderUnpublishedSection(blogPosts) {
  return (
    <ContentContainer>
      <h4 style="margin-bottom:0">Unpublished</h4>

      <ul style="margin-top:0">
        {(blogPosts.map((post) => {
          return (
            <li>
              <a href={post.href()}>
                {post.title()}
              </a>
            </li>
          )
        }))}
      </ul>

      <hr/>
    </ContentContainer>
  )
}

function rebuildState({ site }) {
  const unpublishedBlogPosts = []
  const publishedBlogPosts = []

  site.blogPosts().forEach((blogPost) => {
    if (blogPost.wasPublished()) {
      publishedBlogPosts.push(blogPost)
    } else {
      unpublishedBlogPosts.push(blogPost)
    }
  })

  return {
    publishedBlogPosts,
    unpublishedBlogPosts,
  }
}
