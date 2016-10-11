import preact from 'preact'
import PageRoot from './page-root.jsx'
import SiteHeader from './components/site-header.jsx'
import SiteFooter from './components/site-footer.jsx'

export default class IndexPage extends preact.Component {
  render() {
    return (
      <PageRoot pageTitle="Home">
        <SiteHeader></SiteHeader>

        <main>
          <h1>Bryan Yap</h1>
        </main>

        <SiteFooter></SiteFooter>
      </PageRoot>
    )
  }
}
