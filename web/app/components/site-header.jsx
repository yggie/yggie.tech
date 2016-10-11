import preact from 'preact'
import css from '@cssmodules/components/site-header.css.json'

export default class SiteHeader extends preact.Component {
  render() {
    return (
      <header className={css.header}>
        <nav>
          <ul className={css['nav-list']}>
            <li><a href="about">About</a></li>
            <li><a href="blog">Blog</a></li>
            <li><a href="talks">Talks</a></li>
            <li><a href="projects">Projects</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}
