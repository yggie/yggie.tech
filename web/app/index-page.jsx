import preact from 'preact'
import PageRoot from './page-root.jsx'
import PrimaryHeader from './_components/primary-header.jsx'
import PrimaryFooter from './_components/primary-footer.jsx'
import ContentContainer from './_layout/content-container.jsx'

export const PAGE_META = {
  title: 'Home',
}

export default class IndexPage extends preact.Component {
  render() {
    const { site } = this.props

    return (
      <PageRoot pageMetadata={PAGE_META} site={site}>
        <PrimaryHeader pageMetadata={PAGE_META}></PrimaryHeader>

        <main>
          <ContentContainer>
            <h1>H1 Heading</h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non
              justo tristique felis sollicitudin iaculis eget eu metus. Donec
              facilisis risus tincidunt tempus dictum. Mauris pretium
              scelerisque tellus ut sagittis. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Suspendisse nec dolor consequat,
              consectetur massa dictum, suscipit orci. Aliquam fringilla lorem
              in velit blandit, eget tempor metus ultricies. Duis leo risus,
              aliquet eu interdum a, scelerisque a quam.

              abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            </p>
          </ContentContainer>
        </main>

        <PrimaryFooter></PrimaryFooter>
      </PageRoot>
    )
  }
}
