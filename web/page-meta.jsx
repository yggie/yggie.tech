import preact from 'preact'

export default class PageMeta extends preact.Component {
  render() {
    if (this.props.children.length !== 1) {
      throw new Error('Exactly one component must be specified as the child!')
    }

    return this.props.children[0]
  }

  componentWillReceiveProps(nextProps) {
    this.updatePageMeta(nextProps)
  }

  componentDidMount() {
    this.updatePageMeta(this.props)
  }

  updatePageMeta(props) {
    document.head.querySelector('title').innerText = props.title || 'Page Title'
  }
}
