import preact from 'preact'
import PageRoot from '../page-root.jsx'

export default class BlogPostLayout extends preact.Component {
  render() {
    return (
      <PageRoot {...this.props}>
        <main>{this.props.children}</main>
        <footer>This is the footer</footer>
      </PageRoot>
    )
  }
}
