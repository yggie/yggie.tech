import preact from 'preact'
import css from '@cssmodules/_components/site-header.css.json'
import Container from '../_layout/container.jsx'

export default class SiteHeader extends preact.Component {
  render() {
    return (
      <header className={css.header}>
        <Container>
          <nav>
            <ul className={css['nav-list']}>
              <li><a href="about">About</a></li>
              <li><a href="blog">Blog</a></li>
              <li><a href="talks">Talks</a></li>
              <li><a href="projects">Projects</a></li>
            </ul>
          </nav>
        </Container>
      </header>
    )
  }
}
