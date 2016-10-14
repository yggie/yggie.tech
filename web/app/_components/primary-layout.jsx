import preact from 'preact'
import PageRoot from '../page-root.jsx'
import PrimaryHeader from './primary-header.jsx'
import PrimaryFooter from './primary-footer.jsx'

export default class PrimaryLayout extends preact.Component {
  render() {
    return (
      <PageRoot {...this.props}>
        <PrimaryHeader></PrimaryHeader>

        <main>
          {this.props.children}
        </main>

        <PrimaryFooter></PrimaryFooter>
      </PageRoot>
    )
  }
}
