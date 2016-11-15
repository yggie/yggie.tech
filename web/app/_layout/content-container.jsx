import preact from 'preact'
import styles from '@cssmodules/_layout/content-container.css.json'

export default class ContentContainer extends preact.Component {
  render() {
    this.props.className = [this.props.className, styles.container].join(' ')

    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
