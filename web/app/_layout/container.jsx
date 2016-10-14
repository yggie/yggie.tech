import preact from 'preact'
import css from '@cssmodules/_layout/container.css.json'

export default class Container extends preact.Component {
  render() {
    this.props.className = [this.props.className, css.container].join(' ')

    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
