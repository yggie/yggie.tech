import preact from 'preact'
import PageMeta from '../page-meta.jsx'

export default class StandardLayout extends preact.Component {
  render() {
    if (this.props.children.length !== 1) {
      throw new Error('Exactly one component must be specified as the child!')
    }

    return (
      <PageMeta {...this.props}>
        {this.props.children[0]}
      </PageMeta>
    )
  }

  scriptTags() {
    return (this.props.assets.scripts || []).map((scriptLink) => {
      return <script src={scriptLink} key={scriptLink}></script>
    })
  }
}
