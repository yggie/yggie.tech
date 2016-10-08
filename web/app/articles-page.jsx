import preact from 'preact'
import Page from './page.jsx'

export default class Index extends preact.Component {
  render() {
    return (
      <Page pageTitle="Articles" className="home-page">
        <h1>This is the articles page!</h1>

        <footer>
        </footer>
      </Page>
    )
  }
}
