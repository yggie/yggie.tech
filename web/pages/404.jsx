import preact from 'preact'
import StandardLayout from '../layouts/standard-layout.jsx'

export default class _404 extends preact.Component {
  render() {
    return (
      <StandardLayout title="Not found">
        <main>
          <h1>What you were looking for was not found</h1>

          <p>This is a 404 page</p>
        </main>
      </StandardLayout>
    )
  }
}
