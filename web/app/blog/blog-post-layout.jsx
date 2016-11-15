import preact from 'preact'
import PageRoot from '../page-root.jsx'
import PrimaryFooter from '../_components/primary-footer.jsx'
import PageContainer from '../_layout/page-container.jsx'
import stickyFooterStyles from '@cssmodules/_layout/sticky-footer.css.json'

export default class BlogPostLayout extends preact.Component {
  render() {
    return (
      <PageRoot {...this.props}>
        <PageContainer>
          <div className={stickyFooterStyles['above-footer']}>
            <main>
              {this.props.children}
            </main>
          </div>

          <PrimaryFooter className={stickyFooterStyles.footer}></PrimaryFooter>
        </PageContainer>
      </PageRoot>
    )
  }
}
