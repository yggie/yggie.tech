import preact from 'preact'
import Page from '../page.jsx'

export default class StandardLayout extends preact.Component {
  render() {
    return (
      <Page {...this.props}>
        <main>{this.props.children}</main>
        <footer>This is the footer</footer>
      </Page>
    )
  }

  scriptTags() {
    return (this.props.assets.scripts || []).map((scriptLink) => {
      return <script src={scriptLink} key={scriptLink}></script>
    })
  }
}
