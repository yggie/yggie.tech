import preact from 'preact'
import Page from './page.jsx'

export default class IndexPage extends preact.Component {
  render() {
    return (
      <Page pageTitle="Home" className="home-page">
        <h1>Hello World!</h1>

        <p>This is a sample page with some soon to be added content</p>

        <nav>
          <ul>
            <li><a href="about">About</a></li>
            <li><a href="talks">Talks</a></li>
            <li><a href="blog">Blog</a></li>
            <li><a href="projects">Projects</a></li>
          </ul>
        </nav>

        <footer>
        </footer>
      </Page>
    )
  }
}
