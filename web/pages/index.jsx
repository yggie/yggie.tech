import preact from 'preact'
import StandardLayout from '../layouts/standard-layout.jsx'

export default class Index extends preact.Component {
  onClickBigBadButton() {
    alert('The big bad button has been clicked')
  }

  render() {
    return (
      <StandardLayout title="The Index Page">
        <main>
          <h1>Hello World!</h1>

          <p>This is a sample page with some soon to be added content</p>

          <button onClick={this.onClickBigBadButton}>
            Big Bad Button
          </button>
        </main>
      </StandardLayout>
    )
  }
}
