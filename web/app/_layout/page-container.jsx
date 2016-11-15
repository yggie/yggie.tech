import preact from 'preact'
import styles from '@cssmodules/_layout/page-container.css.json'

export default class PageContainer extends preact.Component {
  render() {
    this.props.className = [this.props.className, styles.container].join(' ')

    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
