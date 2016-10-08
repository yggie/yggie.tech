import preact from 'preact'
import StandardLayout from '../app/layouts/standard-layout.jsx'

export default class Why extends preact.Component {
  render() {
    return (
      <StandardLayout pageTitle="Why">
        <main>
          <h1>Why</h1>

          <p>This is the Why</p>
        </main>
      </StandardLayout>
    )
  }
}
