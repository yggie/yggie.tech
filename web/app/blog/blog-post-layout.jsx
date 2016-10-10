import preact from 'preact'
import Page from '../page.jsx'

export default class BlogPostLayout extends preact.Component {
  render() {
    return (
      <Page {...this.props}>
        <main>{this.props.children}</main>
        <footer>This is the footer</footer>
      </Page>
    )
  }
}
