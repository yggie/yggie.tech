import preact from 'preact'
import styles from '@cssmodules/_components/primary-footer.css.json'
import ContentContainer from '../_layout/content-container.jsx'

export default class PrimaryFooter extends preact.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <ContentContainer>
          <ul className={styles['social-links-list']}>
            <li>
              <a href="https://github.com/yggie" target="_blank">
                <img src="/assets/github-social-icon.svg"
                  width="25"
                  height="25"
                  alt="github:yggie" />
              </a>
            </li>

            <li>
              <a href="https://twitter.com/0xseed" target="_blank">
                <img src="/assets/twitter-social-icon.svg"
                  width="25"
                  height="25"
                  alt="twitter:0xseed" />
              </a>
            </li>
          </ul>
        </ContentContainer>

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
        </ContentContainer>
      </footer>
    )
  }
}
