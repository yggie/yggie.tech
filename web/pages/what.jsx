import preact from 'preact'
import StandardLayout from '../app/layouts/standard-layout.jsx'

export default class What extends preact.Component {
  render() {
    return (
      <StandardLayout pageTitle="What">
        <main>
          <h1>What</h1>

          <p>This is the What</p>
        </main>
      </StandardLayout>
    )
  }
}
