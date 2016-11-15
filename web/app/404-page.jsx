import preact from 'preact'
import PageRoot from './page-root.jsx'
import ContentContainer from './_layout/content-container.jsx'

export default class _404Page extends preact.Component {
  render() {
    return (
      <PageRoot pageTitle="Not found">
        <ContentContainer>
          <main>
            <h1>What you were looking for was not found</h1>

            <p>
              This is a 404 page, return to safety by
              clicking <a href="/">here</a>.
            </p>
          </main>
        </ContentContainer>
      </PageRoot>
    )
  }
}
