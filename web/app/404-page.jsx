import preact from 'preact'
import Page from './page.jsx'

export default class _404Page extends preact.Component {
  render() {
    return (
      <Page pageTitle="Not found">
        <main>
          <h1>What you were looking for was not found</h1>

          <p>This is a 404 page</p>
        </main>
      </Page>
    )
  }
}
