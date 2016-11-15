import preact from 'preact'
import styles from '@cssmodules/_components/primary-header.css.json'
import ContentContainer from '../_layout/content-container.jsx'

export default class PrimaryHeader extends preact.Component {
  render() {
    const props = this.props

    return (
      <header className={styles.header}>
        <ContentContainer>
          <nav className={styles['nav-group']}>
            <ul className={styles['nav-list']}>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/talks">Talks</a></li>
              <li><a href="/projects">Projects</a></li>
            </ul>
          </nav>

          <h1>{props.pageTitle}</h1>
        </ContentContainer>
      </header>
    )
  }
}
