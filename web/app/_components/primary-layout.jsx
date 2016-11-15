import preact from 'preact'
import PageRoot from '../page-root.jsx'
import PrimaryHeader from './primary-header.jsx'
import PrimaryFooter from './primary-footer.jsx'
import PageContainer from '../_layout/page-container.jsx'
import stickyFooterStyles from '@cssmodules/_layout/sticky-footer.css.json'

export default class PrimaryLayout extends preact.Component {
  render() {
    const props = this.props

    return (
      <PageRoot {...props}>
        <PageContainer className={stickyFooterStyles.parent}>
          <div className={stickyFooterStyles['above-footer']}>
            <PrimaryHeader pageTitle={props.pageTitle}></PrimaryHeader>

            <main>
              {props.children}
            </main>
          </div>

          <PrimaryFooter className={stickyFooterStyles.footer}></PrimaryFooter>
        </PageContainer>
      </PageRoot>
    )
  }
}
