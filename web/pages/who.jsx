import preact from 'preact'
import StandardLayout from '../layouts/standard-layout.jsx'

export default class Who extends preact.Component {
  render() {
    return (
      <StandardLayout title="Who">
        <main>
          <h1>Who</h1>

          <p>This is a page about who</p>
        </main>
      </StandardLayout>
    )
  }
}
